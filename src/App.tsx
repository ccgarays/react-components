import { SearchInput, Accordion } from "./components";

type Fruits = {
  id: string;
  label: string;
  name: string;
};

const dataSearchInput: Fruits[] = [
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

/* const dataAccordion: { id: number; title: string; content: string }[] = [
  {
    id: 1,
    title: "titulo 1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit vitae sed eveniet a tempora optio rerum ab consequuntur officiis, deserunt magnam delectus voluptate illum rem sint, consequatur obcaecati odit repellendus?",
  },
  {
    id: 2,
    title: "titulo 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit vitae sed eveniet a tempora optio rerum ab consequuntur officiis, deserunt magnam delectus voluptate illum rem sint, consequatur obcaecati odit repellendus?",
  },
  {
    id: 3,
    title: "titulo 3",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit vitae sed eveniet a tempora optio rerum ab consequuntur officiis, deserunt magnam delectus voluptate illum rem sint, consequatur obcaecati odit repellendus?",
  },
];
 */

const dataAccordion2 = [
  {
    id: 1,
    title: "titulo 1",
    content: <div>div numero 1</div>,
  },
  {
    id: 2,
    title: "titulo 2",
    content: <p>div numero 2</p>,
  },
  {
    id: 3,
    title: "titulo 3",
    content: <div>div numero 3</div>,
  },
];

function App() {
  return (
    <>
      <SearchInput
        data={dataSearchInput}
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
      <Accordion data={dataAccordion2} />
    </>
  );
}

export default App;
