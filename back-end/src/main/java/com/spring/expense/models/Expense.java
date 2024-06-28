package com.spring.expense.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
@Table(name="expenses")
public class Expense {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "expenseUserid", referencedColumnName = "userid")
    @JsonIgnore
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private int expenseId;
    private String expenseName;

    private String description;

    private String category;
    private double amount;
    private String paymentType;
    private LocalDate date;


    public int getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(int expenseId) {
        this.expenseId = expenseId;
    }

    public String getExpenseName() {
        return expenseName;
    }

    public void setExpenseName(String expenseName) {
        this.expenseName = expenseName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Override
    public String toString()
    {
        return "Expense [id=" + expenseId +",userid="+user.getUserid()+",name=" + expenseName + ",description="+ description + ",category=" + category+ ",amount="+ amount + ",payment Type="+ paymentType + ",Date="+ date + "]";

    }
}
