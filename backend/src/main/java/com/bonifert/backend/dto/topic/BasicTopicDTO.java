package com.bonifert.backend.dto.topic;

import com.bonifert.backend.dto.term.GeneratedTermDTO;
import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasicTopicDTO {
  @SerializedName("topic")
  private String name;
  @SerializedName("terms")
  private List<GeneratedTermDTO> terms;
}
