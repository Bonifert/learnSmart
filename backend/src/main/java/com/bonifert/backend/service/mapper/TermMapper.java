package com.bonifert.backend.service.mapper;

import com.bonifert.backend.dto.term.TermDTO;
import com.bonifert.backend.model.Term;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TermMapper {
  TermDTO toTermDTO(Term term);
  List<TermDTO> toTermDTOs(List<Term> terms);
  Term toTerm(TermDTO termDTO);
  List<Term> toTerms(List<TermDTO> termDTOs);
}
