package com.spring.expense.repository;

import com.spring.expense.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense,Integer>
{

   List<Expense> findByExpenseName(String name);

   List<Expense> findByPaymentType(String name);

   List<Expense> findByUserUserid(int userid);


   @Query(value = "SELECT e from Expense e where e.user.userid=:userid  AND  FUNCTION('YEAR',e.date)=:year AND FUNCTION('MONTH',e.date)=:monthInt ")
   List<Expense> findByUserUseridAndDateYear(int userid,int year,int monthInt);

   @Query(value="SELECT DISTINCT(e.category) from Expense e where e.user.userid=:userid")
   List<String> findByDistinctCategories(int userid);
}
