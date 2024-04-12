import TopicWithDefinitionForm from "../components/TopicWithDefinitionForm.tsx";
import {useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {generateTopicWithDefinitions} from "../providers/topicProvider.ts";
import {useFeedback} from "../context/alertContext/feedbackContextImport.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GeneratedTopicPreview from "../components/GeneratedTopicPreview.tsx";

export interface TopicWithDefinitionRequest {
  topic: string;
  examples: string[];
  numberOfCards: number;
  definitionSentenceAmount: number;
}

export interface BasicTopic {
  name: string;
  terms: BasicTerm[];
}

export interface BasicTerm {
  name: string;
  definition: string;
}

const CreateTopicWithDefinition = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [basicTopic, setBasicTopic] = useState<null | BasicTopic>(null);
  const {feedback} = useFeedback();



  async function generateTopic(data: TopicWithDefinitionRequest){
    setLoading(true);
    try {
      const response = await generateTopicWithDefinitions(data);
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

  if (basicTopic){
    return <GeneratedTopicPreview topic={basicTopic} onCancel={()=> setBasicTopic(null)}/>;
  }

  return <TopicWithDefinitionForm onGenerate={generateTopic}/>;

};

export default CreateTopicWithDefinition;