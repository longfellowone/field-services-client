https://www.npmjs.com/package/classnames
https://medium.com/crowdbotics/how-to-use-usereducer-in-react-hooks-for-performance-optimization-ecafca9e7bf5
https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down

https://ericp.co/posts/why-react-hooks-are-great/

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
