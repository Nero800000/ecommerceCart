
import { create } from "zustand"; 


type Rating = {
  rate: number;
  count: number;
};

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: Rating;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  decreaseQuantity: (id: number) => void
  getTotalItems: () => number;
  getTotalPrice: () => number;
  saveBuy:() => void
  getTotalPriceDescont: () => number;

}


export const useCartStore = create<CartState>((set,get) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: 1 }], // por que não fica [[]] duvidazinha besta para depois 
      };
    }),
decreaseQuantity: (id) =>
  set((state) => {
    const item = state.cart.find((item) => item.id === id);

    if (!item) return state;

    if (item.quantity === 1) {
      return {
        cart: state.cart.filter((item) => item.id !== id),
      };
    }

    return {
      cart: state.cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    };
  }),


getTotalItems: () => {
  const { cart } = get();
  return cart.reduce((total, item) => total + item.quantity, 0);
},

getTotalPrice: () => {
  const { cart } = get();

  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
},
saveBuy:() => {
  
  const {cart} = get()
  if(!cart.length) {
    return
  }
  const storebuys = localStorage.getItem("buy")
  const buys = JSON.parse(storebuys || '[]')


  const Total = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const buyObject = {
    products:cart,
    total: Total.toFixed(2),
    date: new Date().toLocaleDateString(),
   
  }
  localStorage.setItem(`buy`,JSON.stringify([...buys,buyObject]))
  set({cart:[]})

},

getTotalPriceDescont: () => {
  const { cart } = get();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  let discount = 0;

  if (total > 2000) {
    discount = 25;
  } else if (total > 500) {
    discount = 10;
  }

  const finalTotal = total - total * (discount / 100);


  return finalTotal;
},


  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cart: [] }),
}));
