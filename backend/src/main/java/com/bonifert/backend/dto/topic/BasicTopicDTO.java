package com.bonifert.backend.dto.topic;

import com.bonifert.backend.dto.term.BasicTermDTO;
import com.google.gson.annotations.SerializedName;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasicTopicDTO {
  @Valid
  @NotNull(message = "topic is mandatory")
  @NotBlank(message = "topic is mandatory")
  @SerializedName("topic")
  private String name;

  @NotNull(message = "topic is mandatory")
  @SerializedName("terms")
  private List<BasicTermDTO> terms;
}
