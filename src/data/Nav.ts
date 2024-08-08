type NavType = {
  label: string;
  href: string;
  id: string;
  type: string;
};

const NavData: NavType[] | null = [
  { label: "Home", href: "/", id: "Home", type: "public" },
  { label: "ToDo", href: "/ToDo", id: "ToDo", type: "private" },
  {
    label: "ToDoDeleted",
    href: "/ToDoDeleted",
    id: "ToDoDeleted",
    type: "private",
  },
  {
    label: "ToDoCompleted",
    href: "/ToDoCompleted",
    id: "ToDoCompleted",
    type: "private",
  },
  { label: "UserMap", href: "/UserMap", id: "UserMap", type: "special" },
];

export { NavData };
export type { NavType };
