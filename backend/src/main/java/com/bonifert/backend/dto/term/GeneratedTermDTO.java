package com.bonifert.backend.dto.term;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneratedTermDTO {
  @SerializedName("name")
  private String name;

  @SerializedName("definition")
  private String definition;
}
