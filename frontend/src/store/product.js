import { create } from "zustand"; // ✅ named import

export const userProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {
        success: false,
        message: "Please provide name, price and image",
      };
    }
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const product = await response.json();
    set((state) => ({ products: [...state.products, product] }));
    return {
      success: response.ok,
      message: "Product created successfully",
    };
  },
  setnewProduct: { name: "", price: "", image: "" },
}));

// const[state,setState]=useState({}) this is local state and above is global state using zustand, we can use this state in any component without prop drilling and also we can update the state from any component without passing the setState function as props.
