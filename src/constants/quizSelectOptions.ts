import { CustomizeQuizOptionsT } from "../types/CustomizeQuizOptions";

const CategoriesOptions: CustomizeQuizOptionsT[] = [
  {
    val: "General Knowledge",
    type: "9",
  },

  {
    val: "Entertainment: Books",
    type: "10",
  },
  {
    val: "Entertainment: Film",
    type: "11",
  },
  {
    val: "Entertainment: Music",
    type: "12",
  },
  {
    val: "Entertainment: Musicals & Theatres",
    type: "13",
  },
  {
    val: "Entertainment: Television",
    type: "14",
  },
  {
    val: "Entertainment: Video Games",
    type: "15",
  },
  {
    val: "Entertainment: Board Games",
    type: "16",
  },
  {
    val: "Science & Nature",
    type: "17",
  },
  {
    val: "Science: Computers",
    type: "18",
  },
  {
    val: "Science: Mathematics",
    type: "19",
  },
  {
    val: "Mythology",
    type: "20",
  },
  {
    val: "Sports",
    type: "21",
  },
  {
    val: "Geography",
    type: "22",
  },
  {
    val: "History",
    type: "23",
  },
  {
    val: "Politics",
    type: "24",
  },
  {
    val: "Art",
    type: "25",
  },
  {
    val: "Celebrities",
    type: "26",
  },
  {
    val: "Aniamls",
    type: "27",
  },
  {
    val: "Vehicles",
    type: "28",
  },
  {
    val: "Entertainment: Comics",
    type: "29",
  },
  {
    val: "Science : Gadgets",
    type: "30",
  },
  {
    val: "Entertainment: Japanese Anime & Manga",
    type: "31",
  },
  {
    val: "Entertainment: Cartoon & Animations",
    type: "32",
  },
];

const DifficultyOptions: CustomizeQuizOptionsT[] = [
  { val: "Easy", type: "easy" },
  { val: "Medium", type: "medium" },
  { val: "Hard", type: "hard" },
];

const McqTypeOptions: CustomizeQuizOptionsT[] = [
  { val: "Multiple", type: "multiple" },
  
];

export { McqTypeOptions, DifficultyOptions, CategoriesOptions };
