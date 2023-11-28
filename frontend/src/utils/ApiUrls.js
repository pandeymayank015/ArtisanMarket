export const url = "http://localhost:9090/api";

export const isArtisan = () => {
    return JSON.parse(localStorage.getItem("currentUser")).roles[0] === "ROLE_ARTISAN";
}