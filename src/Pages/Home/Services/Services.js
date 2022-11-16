import React, { useEffect, useState } from "react";
import { useRef } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [isAsc, setIsAsc] = useState(true);
  const [search, setSearch] = useState("");
  const searchRef = useRef();

  useEffect(() => {
    fetch(
      `http://localhost:5000/services?search=${search}&order=${
        isAsc ? "asc" : "desc"
      }`
    )
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [isAsc, search]);

  const handleSearch = () => {
    setSearch(searchRef.current.value);
  };
  return (
    <div>
      <div className="text-center mb-6">
        <p className="text-2xl font-bold text-orange-600">Services</p>
        <p className="text-5xl font-semibold">Our Service Area</p>
        <p className="text-gray-500 my-3">
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.{" "}
        </p>
        <input ref={searchRef} type="text" className="input input-sm" />{" "}
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => setIsAsc(!isAsc)} className="btn btn-ghost">
          {isAsc ? "desc" : "asc"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
