package com.spring.expense.service;

import com.spring.expense.models.Budget;
import com.spring.expense.models.Expense;
import com.spring.expense.models.Reports;
import com.spring.expense.models.User;
import com.spring.expense.repository.BudgetRepository;
import com.spring.expense.repository.ExpenseRepository;
import com.spring.expense.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;


@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    private final BudgetRepository budgetRepository;

    public ExpenseService(ExpenseRepository expenseRepository, UserRepository userRepository, BudgetRepository budgetRepository) {

        this.expenseRepository=expenseRepository;
        this.userRepository=userRepository;
        this.budgetRepository=budgetRepository;
    }


    public Expense addExpense(Expense expense)
    {
        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByEmail(email).get();
        expense.setUser(user);
        expense.setDate(LocalDate.now());
        Budget budget=budgetRepository.findByUserUseridAndMonthAndYear(user.getUserid(),LocalDate.now().format(DateTimeFormatter.ofPattern("MMMM")),LocalDate.now().getYear()).get();
        budget.setBudgetUsed(budget.getBudgetUsed()+expense.getAmount());
        budgetRepository.save(budget);
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses()
    {

        return expenseRepository.findAll();
    }
    public List<Expense> getExpensesOfUser()
    {

        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        int userid=userRepository.findByEmail(email).get().getUserid();
        System.out.println(userid);
        return expenseRepository.findByUserUserid(userid);
    }
    public Expense updateExpense(int id,Expense expense)
    {
        Expense updateExpense=expenseRepository.findById(id).get();
        updateExpense.setExpenseName(expense.getExpenseName());
        updateExpense.setAmount(expense.getAmount());
        updateExpense.setCategory(expense.getCategory());
        updateExpense.setDescription(expense.getDescription());
        updateExpense.setPaymentType(expense.getPaymentType());
        updateExpense.setDate(LocalDate.now());
        return expenseRepository.save(updateExpense);

    }
    public void deleteExpense(int id) throws NoSuchFieldException {
        if(!expenseRepository.existsById(id))
        {
            throw new NoSuchFieldException("Expense with "+id+" not found");
        }
        Expense expense=expenseRepository.findById(id).get();
        expenseRepository.deleteById(id);
        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByEmail(email).get();
        Budget budget=budgetRepository.findByUserUseridAndMonthAndYear(user.getUserid(),LocalDate.now().format(DateTimeFormatter.ofPattern("MMMM")),LocalDate.now().getYear()).get();
        budget.setBudgetUsed(budget.getBudgetUsed()-expense.getAmount());
        budgetRepository.save(budget);

    }
    public List<Expense> getMonthExpenses()
    {
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        int id=userRepository.findByEmail(email).get().getUserid();
        List<Expense> monthExpenses=expenseRepository.findByUserUserid(id).stream().filter(exp->exp.getDate().format(DateTimeFormatter.ofPattern("MMMM")).equals(LocalDate.now().format(DateTimeFormatter.ofPattern("MMMM")))).collect(Collectors.toList());
        return monthExpenses;
    }
    public Predicate<Expense> buildPredicate(Reports reports)
    {
        Predicate<Expense> predicate=expense -> true;
        if(reports.getStartDate()!=null)
        {
            predicate=predicate.and(exp->exp.getDate().isAfter(reports.getStartDate()) ||exp.getDate().equals(reports.getStartDate()));
        }
        if(reports.getEndDate()!=null)
        {
            predicate=predicate.and(exp->exp.getDate().isBefore(reports.getEndDate()) ||exp.getDate().equals(reports.getEndDate()));
        }
        if(reports.getStartAmount()!=0)
        {
            predicate=predicate.and(exp->exp.getAmount()>=reports.getStartAmount());
        }
        if(reports.getEndAmount()!=0)
        {
            predicate=predicate.and(exp->exp.getAmount()<=reports.getEndAmount());
        }
        if(!reports.getCategory().isEmpty())
        {
            predicate=predicate.and(exp->exp.getCategory().equals(reports.getCategory()));
        }
        if(!reports.getTransactionType().isEmpty())
        {
            predicate=predicate.and(exp->exp.getPaymentType().equals(reports.getTransactionType()));
        }
        return predicate;
    }
    public List<Expense> getExpenseReports(Reports reports)
    {

        Predicate<Expense> predicate=buildPredicate(reports);
        List<Expense> expense= getExpensesOfUser();
        List<Expense> filteredExpense=expense.stream().filter(predicate).collect(Collectors.toList());
        System.out.println(expense);
        System.out.println(filteredExpense);
        return filteredExpense;

    }
}
