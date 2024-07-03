package com.spring.expense.service;

import com.spring.expense.models.Budget;
import com.spring.expense.models.User;
import com.spring.expense.repository.BudgetRepository;
import com.spring.expense.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    public Budget setBudget(Budget budget) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        String month=LocalDate.now().format(DateTimeFormatter.ofPattern("MMMM"));
        int year=LocalDate.now().getYear();
        budget.setMonth(month);
        budget.setYear(year);
        budget.setUser(userRepository.findByEmail(email).get());
        return budgetRepository.save(budget);
    }

    public Budget editBudget(Budget budget) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        String month=LocalDate.now().format(DateTimeFormatter.ofPattern("MMMM"));
        int year=LocalDate.now().getYear();
        int id = userRepository.findByEmail(email).get().getUserid();
        Budget budget1 = budgetRepository.findByUserUseridAndMonthAndYear(id, month, year).get();
        budget1.setBudget(budget.getBudget());
        return budgetRepository.save(budget1);
    }

    public Budget checkBudget() throws NoSuchFieldException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        String month=LocalDate.now().format(DateTimeFormatter.ofPattern("MMMM"));
        int year=LocalDate.now().getYear();
        int id=userRepository.findByEmail(email).get().getUserid();
        Optional<Budget> budget1=budgetRepository.findByUserUseridAndMonthAndYear(id,month,year);
        return budget1.orElseThrow(()->new NoSuchFieldException());

    }

    public List<Budget> getBudgetInfo()
    {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        int id =userRepository.findByEmail(email).get().getUserid();
        return budgetRepository.findByUserUserid(id);
    }
}
