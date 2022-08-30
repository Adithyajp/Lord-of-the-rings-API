import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState([]);
  const [options, setOptions] = useState([]);
  const [checker, setChecker] = useState(true);
  function onSelect(selectedList, selectedItem) {
    let data = [];
    selectedList?.forEach((item) => {
      data.push(item.name);
    });
    setRace(data);
  }

  function onRemove(selectedList, removedItem) {
    let data = [];
    selectedList?.forEach((item) => {
      data.push(item.name);
    });
    setRace(data);
  }
  const calculatePages = () => {
    // totalPages;
  };
  const setData = (data) => {
    setAllCharacters(data.docs);
    setCurrentPage(data.page);
    setTotalPages(data.pages);

    //////for setting races mutltiselect
    if (checker) {
      setAllOptions(data);
    }

    console.log(checker, "this is checker");
  };

  const setAllOptions = (data) => {
    let races = [];
    let racess = [];
    data?.docs.forEach((item) => {
      if (races.includes(item?.race) === false) {
        races.push(item.race);
        // options.push({name: item.race})
      }
    });
    races.forEach((item) => {
      racess.push({ name: item });
      console.log("all set");
    });
    setOptions(racess);
    setChecker(false);
  };
  const setUrl = () => {
    let races = "";
    race.forEach((item) => {
      races = races + item + ",";
    });
    let url =
      "https://the-one-api.dev/v2/character?limit=" +
      limit +
      "&name=" +
      searchQuery +
      "&sort=name:" +
      sortBy +
      "&gender=" +
      gender +
      "&race=" +
      races;

    return url;
  };
  const getAllCharacters = () => {
    fetch(setUrl(), {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + "HDetKQ7-LasLFEbfZ-jc",
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => setData(actualData))
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getAllCharacters();
  }, [limit]);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div>
        <h1 className="text-3xl font-bold">The Lord of the Rings API</h1>
        <p className="text-lg mt-5">The one API to rule them all</p>
      </div>
      <div className="border border-black mt-14 w-[700px]">
        <div className="border-b border-b-black flex justify-center text-xl font-semibold">
          Characters
        </div>
        <div className="border-b border-b-black">
          <div className="flex items-center px-5 py-3 gap-6">
            <div className="flex items-center gap-3">
              <h1>Search</h1>
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-1 border"
                type="text"
                placeholder="by name"
              />
            </div>
            <div className="flex items-center gap-3">
              <h1>Sort By</h1>
              <select
                onChange={(e) => setSortBy(e.target.value)}
                className="p-1 border"
                placeholder="by name"
              >
                <option value="asc">asc</option>
                <option value="dsc">dsc</option>
              </select>
            </div>
          </div>
          <div className="flex items-center px-5 py-3 justify-between">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <h1>Race</h1>
                {/* <select className="p-1 border" placeholder="by name">
                  <option value="">Human</option>
                  <option value="">Dwarf</option>
                </select> */}
                <Multiselect
                  options={options} // Options to display in the dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
              </div>
              <div className="flex items-center gap-3">
                <h1>Gender</h1>
                <select
                  onChange={(e) => setGender(e.target.value)}
                  className="p-1 border"
                  placeholder="by name"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="">Any</option>
                </select>
              </div>
            </div>
            <div>
              <button className="bg-red-300" onClick={() => getAllCharacters()}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="overflow-y-scroll px-5 pb-3 h-[300px] border-b border-b-black">
            <table className="table-auto w-full">
              <thead className="sticky top-0 bg-white">
                <tr className="text-left">
                  <th className="font-semibold py-3 text-[14px]">ID</th>
                  <th className="font-semibold text-[14px]">Name</th>
                  <th className="font-semibold text-[14px]">Race</th>
                  <th className="font-semibold text-[14px]">Gender</th>
                  <th className="font-semibold text-[14px]">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {allCharacters?.map((data, index) => (
                  <tr className="text-left">
                    <td className="py-3 text-[13px]">{index + 1}</td>
                    <td className="py-3 text-[13px]">{data.name}</td>
                    <td className="py-3 text-[13px]">{data.race}</td>
                    <td className="py-3 text-[13px]">{data.gender}</td>
                    <td className="group hover:text-blue-600 flex items- gap-1 py-3 text-[13px] cursor-pointer">
                      Details{" "}
                      <h1 className="group-hover:translate-x-1.5 transition">
                        ⮞⮞
                      </h1>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center px-5 py-3">
            <div>
              {/* <h1 className="w-7 h-7 border border-black hover:bg-black hover:text-white hover:font-semibold cursor-pointer transition">
                1
              </h1> */}
              <ReactPaginate
                breakLabel="..."
                nextLabel=""
                // onPageChange={handlePageClick}
                pageCount={totalPages}
                // pageRangeDisplayed={5}
                marginPagesDisplayed={3}
                previousLabel=""
                renderOnZeroPageCount={null}
                containerClassName={'flex items-center gap-3'}
                pageClassName={'w-7 h-7 border border-black hover:bg-black hover:text-white hover:font-semibold cursor-pointer transition'}
                activeClassName={'bg-black text-white font-semibold'}
              />
            </div>
            <div className="flex items-center gap-3">
              <h1>Limit</h1>
              <select
                onChange={(e) => setLimit(e.target.value)}
                className="p-1 border"
                placeholder="by name"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
