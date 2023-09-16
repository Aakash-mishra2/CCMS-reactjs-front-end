import { useCallback, useReducer } from "react";

function parchiPadho(state, action) {
    switch (action.type) {
        case 'bhardiya': {

            let formIsValid = true;
            let temp;
            for (temp in state.inputs) {
                if (temp === action.id) {

                    if (!state.inputs[temp]) continue;

                    formIsValid = formIsValid && action.isValid
                } else
                    formIsValid = formIsValid && state.inputs[temp].isValid;
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.id]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        }

        case 'nayiParchi':
            return {
                inputs: action.inputs,
                isValid: action.isValid
            };
        default:
            return state;
    }
};

export function useForm(sareDibbe, initialValidity) {

    const [formState, parchiBharo] = useReducer(parchiPadho, {
        inputs: sareDibbe,
        isValid: initialValidity
    });

    const inputHandler = useCallback((id, value, isValid) => {
        parchiBharo({
            type: 'bhardiya',
            val: value,
            isValid: isValid,
            id: id
        });
    }, []);

    const setFormData = useCallback((nayeDibbe, formValidity) => {
        parchiBharo({
            type: 'nayiParchi',
            inputs: nayeDibbe,
            isValid: formValidity
        });
    }, []);

    return [formState, inputHandler, setFormData];
}