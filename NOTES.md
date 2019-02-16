https://www.npmjs.com/package/classnames

https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down

const CountContext = React.createContext();

const CountProvider = ({ children }) => {
const contextValue = useReducer(reducer, initialState);
return (
<CountContext.Provider value={contextValue}>
{children}
</CountContext.Provider>
);
};

const useCount = () => {
const contextValue = useContext(CountContext);
return contextValue;
};

const todoListReducer = (
state: string[],
action: { type: string; value: string }
) => {
switch (action.type) {
case "ADD":
return […state, action.value];
case "REMOVE":
return state.filter((todo: string) => todo !== action.value);
default:
return state;
}
};
