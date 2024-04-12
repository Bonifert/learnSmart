import {useState} from "react";
import {BasicTopic} from "./CreateTopicWithDefinition.tsx";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import {generateTopicWithWords} from "../providers/topicProvider.ts";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import GeneratedTopicPreview from "../components/GeneratedTopicPreview.tsx";
import TopicWithWordsForm from "../components/TopicWithWordsForm.tsx";

export interface TopicWithWordsRequest {
  topic: string;
  level: string;
  nameLang: string;
  defLang: string;
  numberOfCards: number;
}

const CreateTopicWithWords = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [basicTopic, setBasicTopic] = useState<null | BasicTopic>(null);
  const {feedback} = useFeedback();

  async function generateTopic(data: TopicWithWordsRequest){
    setLoading(true);
    try {
      const response = await generateTopicWithWords(data);
      if (response.status === 200){
        setBasicTopic(response.body as BasicTopic);
      } else {
        feedback("Unexpected error occurred. The topic generation failed.", "error");
      }
    } catch (e) {
      console.log(e);
      feedback("Unexpected error occurred. The topic generation failed.", "error");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
        <Box width="100%" height="50vh" display="flex" justifyContent="center" alignItems="center">
          <CircularProgress/>
          <Typography ml={2}>Generating...</Typography>
        </Box>
    )
  }

  if (basicTopic) return <GeneratedTopicPreview topic={basicTopic}  onCancel={()=> setBasicTopic(null)}/>

  return <TopicWithWordsForm onGenerate={generateTopic}/>
};

export default CreateTopicWithWords;