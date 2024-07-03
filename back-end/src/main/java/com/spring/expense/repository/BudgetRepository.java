package com.spring.expense.repository;

import com.spring.expense.models.Budget;
import com.spring.expense.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget,Integer>
{

Optional<Budget> findByUserUseridAndMonthAndYear(int userid,String month,int year);

List<Budget> findByUserUserid(int userid);

}
