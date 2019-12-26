export * from "./hoc";
export * from "./color";

export function getRole(id) {
  id = Number(id);
  let ret = "Học sinh";
  if (id === 2) ret = "Giáo viên";
  else if (id === 3) return "Admin";
  return ret;
}

export function getSpecialize(specializes, id) {
  if (!specializes) return;

  id = Number(id);
  let ret = "";

  specializes.forEach(item => {
    if (id === item.id) ret = item.ten;
  });

  return ret;
}
