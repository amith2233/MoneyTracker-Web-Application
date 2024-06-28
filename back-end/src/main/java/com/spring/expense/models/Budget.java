package com.spring.expense.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name="budget")
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int budgetId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "budgetUserid",referencedColumnName = "userid")
    @JsonIgnore
    private User user;

    private double budget;
    private double budgetUsed;
    private String month;
    private int year;

    public int getBudgetId() {
        return budgetId;
    }

    public void setBudgetId(int budgetId) {
        this.budgetId = budgetId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getBudget() {
        return budget;
    }

    public void setBudget(double budget) {
        this.budget = budget;
    }

    public double getBudgetUsed() {
        return budgetUsed;
    }

    public void setBudgetUsed(double budgetUsed) {
        this.budgetUsed = budgetUsed;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
