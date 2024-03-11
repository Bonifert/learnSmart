package com.bonifert.backend.service;

import com.bonifert.backend.exception.AccessDeniedException;
import com.bonifert.backend.model.Term;
import com.bonifert.backend.model.Topic;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class Validator {
  public void validate(Topic topic){
    String userName = SecurityContextHolder.getContext().getAuthentication().getName();
    String topicUserName = topic.getUserEntity().getUserName();
    if (!Objects.equals(userName, topicUserName)){
      throw new AccessDeniedException("Resource permission denied");
    }
  }

  public void validate(Term term){
    String userName = SecurityContextHolder.getContext().getAuthentication().getName();
    String termUserName = term.getTopic().getUserEntity().getUserName();
    if (!Objects.equals(userName, termUserName)){
      throw new AccessDeniedException("Resource permission denied");
    }
  }
}
