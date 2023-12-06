import { SearchInput } from "./components";

type Fruits = {
  id: string;
  label: string;
  name: string;
};

const data: Fruits[] = [
  { id: "1", label: "Apple", name: "Apple" },
  { id: "2", label: "banana", name: "banana" },
  { id: "3", label: "blackberry", name: "blackberry" },
  { id: "4", label: "cherry", name: "cherry" },
  { id: "5", label: "lemon", name: "lemon" },
  { id: "6", label: "lime", name: "lime" },
  { id: "7", label: "orange", name: "orange" },
  { id: "8", label: "Papaya", name: "Papaya" },
  { id: "9", label: "pear", name: "pear" },
  { id: "10", label: "pineapple", name: "pineapple" },
];

function App() {
  return (
    <>
      <SearchInput
        data={data}
        style={{
          label: "Fruits",
          fullWidth: false,
          size: "normal",
          defaultValue: "",
        }}
        handleOnChange={(item: Fruits): Fruits => {
          console.log(item);
          return item;
        }}
        // disabled={true}
      />
    </>
  );
}

export default App;
