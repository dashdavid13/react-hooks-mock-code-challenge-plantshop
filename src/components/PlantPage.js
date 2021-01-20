import React, {useEffect, useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then(r => r.json())
    .then(data => setPlants(data))
  }, [])

  function onAddPlant(newPlant){
    setPlants([...plants,newPlant])
  }

  function handleOnDeletePlant(id){
      const updatedPlant = plants.filter(plant => plant.id !==id)
      setPlants(updatedPlant)
  }

  function handleSearchChange(newSearch){
    setSearch(newSearch)
  }

  function handleUpdatePlant(updatedPlant) {
    const updatedPlantsArray = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant;
      } else {
        return plant;
      }
    });
    setPlants(updatedPlantsArray);
  }
  const displayedPlants = plants.filter(plant => plant.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} />
      <Search search={search}  handleSearchChange={handleSearchChange}/>
      <PlantList plants={displayedPlants} 
      onDeletePlant={handleOnDeletePlant}
      onUpdatePlant={handleUpdatePlant}
      />
    </main>
  );
}

export default PlantPage;
