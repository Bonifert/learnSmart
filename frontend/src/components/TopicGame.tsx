import {useState} from "react";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import {createTermReview} from "../providers/termProvider.ts";
import Button from "@mui/material/Button";
import TermWithFlashCard from "./TermWithFlashCard.tsx";
import {useNavigate} from "react-router-dom";
import {Topic} from "../type/Topic.ts";
import {ApiResObj} from "../type/dtos/ApiResObj.ts";

interface Props {
  topic: Topic;
  onReloadTopic: () => void;
}

const TopicGame = ({topic, onReloadTopic}: Props) => {
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const {feedback} = useFeedback();
  const navigate = useNavigate();

  async function handleTermSuccess(termId: number) {
    try {
      const response: ApiResObj = await createTermReview(termId);
      if (response.status === 200) {
        feedback("Answer saved.", "success");
      } else {
        feedback("Unexpected error occurred.", "error");
      }
    } catch (e) {
      console.log(e);
      feedback("Unexpected error occurred.", "error");
    } finally {
      nextTerm();
    }
  }

  function nextTerm() {
    setCurrentTermIndex((prevState) => {
      return prevState + 1;
    });
  }

  function reloadTopic() {
    setCurrentTermIndex(0);
    onReloadTopic();
  }

  if (currentTermIndex === topic.terms.length) return (
      <>
        <Button onClick={reloadTopic}>Reload</Button>
        <Button onClick={() => navigate(`/info/${topic.id}`)}>Back to the topic</Button>
      </>
  );

  return <TermWithFlashCard onTermSuccess={handleTermSuccess} onTermFailed={nextTerm}
                            termInfo={`${currentTermIndex + 1}/${topic.terms.length}`}
                            term={topic.terms[currentTermIndex]}/>
};

export default TopicGame;