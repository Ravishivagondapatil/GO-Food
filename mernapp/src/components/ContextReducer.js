import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD": {
            // Log action details to verify dispatch call
            console.log("Adding item to cart:", action);

            // Check if item is already in cart
            const existingItemIndex = state.findIndex(
                (item) => item.id === action.id && item.size === action.size
            );

            if (existingItemIndex !== -1) {
                // Update quantity if item is already in cart with same size
                const updatedState = [...state];
                updatedState[existingItemIndex].qty += action.qty;
                return updatedState;
            } else {
                // Add new item to cart
                return [
                    ...state,
                    {
                        id: action.id,
                        name: action.name,
                        qty: action.qty,
                        size: action.size,
                        price: action.price,
                        img: action.img
                    },
                ];
            }
        }
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;


        case "UPDATE":
            return state.map((item) =>
                item.id === action.id && item.size === action.size
                    ? { ...item, qty: action.qty, price: action.price }
                    : item
            );
        case "DROP":
            let empArray = []
            return empArray
        default:
            console.error("Unknown action type in reducer:", action.type);
            return state; // Return current state in case of unknown action type
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);


