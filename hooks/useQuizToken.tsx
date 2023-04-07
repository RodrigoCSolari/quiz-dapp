import { QuizTokenContext } from "../contexts/QuizTokenContext";
import { useContext } from "react";

export default function useQuizToken() {
  return useContext(QuizTokenContext);
}
