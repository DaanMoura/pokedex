const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const normalize = (s) => {
    const spaced = s.replace(/-/g, " ");
    return capitalize(spaced);
}