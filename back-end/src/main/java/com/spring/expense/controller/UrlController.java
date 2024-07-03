package com.spring.expense.controller;

import com.spring.expense.models.*;
import com.spring.expense.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@CrossOrigin("*")
public class UrlController {

    public UrlController(UserService userService, ExpenseService expenseService, BudgetService budgetService)
    {

        this.userService=userService;
        this.expenseService=expenseService;
        this.budgetService=budgetService;
    }

    private final UserService userService;

    private final ExpenseService expenseService;

    private final BudgetService budgetService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;
    @GetMapping("/")
    public String sayhello() {
        return "Hello User";
    }
    @PostMapping("/adduser")
    public void addUser(@RequestBody User user)
    {
        userService.addUser(user);
    }

    @PutMapping("/saveuser")
    public ResponseEntity<User> saveUser(@RequestBody User user)
    {
        User userUpdate=userService.updateUser(user);
        return ResponseEntity.ok(userUpdate);
    }

    @GetMapping("/users")
    public List<User> getUsers()
    {
        return userService.getUsers();
    }

    @GetMapping("/users/user")
    public User getUser()
    {
        return userService.getUser().get();
    }

    @GetMapping("/users/email")
    public boolean getUser(@RequestParam(value="email") String email)
    {
        return userService.getUserByEmail(email);
    }

    @PostMapping("/addexpense")
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense)
    {
        return ResponseEntity.ok(expenseService.addExpense(expense));
    }

    @PutMapping("/expense/{id}")
    public Expense updateExpense(@RequestBody Expense expense,@PathVariable int id)
    {
        return expenseService.updateExpense(id,expense);
    }

    @DeleteMapping("/expense/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable int id) {
        try {
            expenseService.deleteExpense(id);
        }
        catch (NoSuchFieldException noSuchFieldException)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(noSuchFieldException.getMessage());
        }
        return ResponseEntity.ok("expense deleted successfully");
    }

    @GetMapping("/expenses")
    public List<Expense> getExpenses()
    {
        return expenseService.getAllExpenses();
    }

    @GetMapping("/expenses/userid")
    public List<Expense> getExpenseOfUser()
    {
        System.out.println(expenseService.getExpensesOfUser());
        return expenseService.getExpensesOfUser();
    }

    @PostMapping("/expenses/reports")
    public List<Expense> getExpenseReports(@RequestBody Reports reports)
    {

        return expenseService.getExpenseReports(reports);
    }

    @GetMapping("expenses/month")
    public List<Expense> getMonthExpenses()
    {
        return expenseService.getMonthExpenses();
    }

    @PostMapping("/budget/set")
    public ResponseEntity<?>  setBudget(@RequestBody Budget budget)
    {
        try
        {
            budgetService.setBudget(budget);
        }
        catch(Error err)
        {
            return ResponseEntity.badRequest().body(err.getMessage());
        }
        return ResponseEntity.ok("budget set successful");
    }

    @PutMapping("/budget/update")
    public ResponseEntity<?> updateBudget(@RequestBody Budget budget)
    {
        try
        {
            budgetService.editBudget(budget);
        }
        catch (Error err)
        {
            return ResponseEntity.badRequest().body(err.getMessage());
        }
        return ResponseEntity.ok("budget edited successfully");

    }
    @GetMapping("/budget/check")
    public ResponseEntity<?> checkBudget()
    {
        try
        {
            Budget existBudget=budgetService.checkBudget();
            return ResponseEntity.ok(existBudget);
        }
        catch (NoSuchFieldException ne)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ne.getMessage());
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws BadCredentialsException {
        try
        {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),authenticationRequest.getPassword()));
        }
        catch (BadCredentialsException be)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(be.getMessage());
        }
        catch (DisabledException de)
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(de.getMessage());
        }
        final UserDetails userDetails=myUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        String jwt=jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthenticationResponse(jwt));

    }





}
