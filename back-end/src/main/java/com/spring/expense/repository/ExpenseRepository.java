package com.spring.expense.repository;

import com.spring.expense.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense,Integer>
{

   List<Expense> findByExpenseName(String name);

   List<Expense> findByPaymentType(String name);

   List<Expense> findByUserUserid(int userid);
}
