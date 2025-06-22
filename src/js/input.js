export function setInputListener(cells, onCellClick) {
  for (let i = 0; i < 9; i++) {
    cells[i].addEventListener("click", () => onCellClick(i));
  }
}
