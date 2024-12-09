function getContinentColor(region, subregion) {
    if (region === "Antarctic")
        return "antarctic-color";
    if (region === "Africa")
        return "africa-color";
    if (region === "Asia")
        return "asia-color";
    if (region === "Europe")
        return "europe-color";
    if (region === "Oceania")
        return "oceania-color";
    if (subregion === "North America")
        return "north-america-color";
    if (subregion !== "North America")
        return "south-america-color";

}

export default getContinentColor;
