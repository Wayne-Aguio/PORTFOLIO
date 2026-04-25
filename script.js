// ─── PAGE DIALOGS ───
const dialogs = {
  home: [
    "Welcome, brave adventurer! I'm your trusty guide on this portfolio quest!",
    "This is the HOME base — where every great journey begins. Press START to dive in!",
    "Use the navigation menu above to travel between different areas of my portfolio or finish the dialog and click the next!.",
    "Each page holds secrets, projects, and stories. Choose your path wisely!"
  ],
  intro: [
    "Ah, you've reached the CHARACTER PROFILE page! This is where you learn about the hero of this story.",
    "Check out the HP and MP bars — gotta stay healthy and full of mana to keep creating!",
    "The skill tags show what powers I've unlocked on my journey so far.",
    "Every hero has an origin story. Scroll through to discover mine!"
  ],
  midterm: [
    "Welcome to the QUEST LOG! These are the challenges I've conquered mid-journey.",
    "Each card represents a completed quest — and I've got the badges to prove it!",
    "From OOP concepts to basic conditional statements to making a program, every skill was hard-earned through practice and dedication.",
    "The quest never ends! More challenges await in the final chapter..."
  ],
  multimedia: [
    "Behold the MULTIMEDIA ARMORY! This is where my creative weapons are stored.",
    "Each artifact here represents a different creative discipline I've mastered.",
    "Hover and click over any item to get a closer look at the details!",
    "From OOP concepts to making a program — variety is the spice of a good portfolio!"
  ],
  final: [
    "Hmm... this area seems to be locked... The final chapter is still being written!",
    "Even the greatest heroes need time to complete their final quest.",
    "Check back later when the chapter is fully unlocked!",
    "Good things come to those who wait... and reload the page!"
  ],
  contact: [
    "You've reached the COMMUNICATION PORTAL! Send me a message anytime.",
    "And look! There's a visitor board where you can pin a sticky note.",
    "Your message means a lot to a solo adventurer like me!",
    "Drop a note, say hello, or share your thoughts. Every visitor is welcome here!"
  ]
};

let currentPage = 'home';
let dialogIndex = 0;
let typing = false;
let typeTimer = null;

const pages = ["home", "intro", "midterm", "multimedia", "final", "contact"];

function setActiveNav(page) {
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const active = document.getElementById('nav-' + page);
  if (active) active.classList.add('active');
}

function startDialog() {
  const list = dialogs[currentPage];
  if (!list || list.length === 0) return;

  resetDialogUI();

  dialogIndex = 0;
  typeDialog(list[0]);
}

function resetDialogUI() {
  document.getElementById('dialog-next').style.display = "none";
  document.getElementById('page-next').style.display = "none";
  document.getElementById('home-btn').style.display = "none";
}

function enterPage(page) {
  showPage(page);
}

function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');

  currentPage = page;

  clearInterval(typeTimer);
  typing = false;

  document.getElementById('dialog-text').innerHTML = "";
  resetDialogUI();  

  setActiveNav(page);

  requestAnimationFrame(() => {
  startDialog();
  });
}

function typeDialog(text) {
  clearInterval(typeTimer);
  typing = true;

  const el = document.getElementById('dialog-text');
  const nextBtn = document.getElementById('dialog-next');

  nextBtn.style.display = "none";

  el.innerHTML = "";

  let i = 0;

  typeTimer = setInterval(() => {
    el.innerHTML = text.substring(0, i) + '<span class="dialog-cursor"></span>';
    i++;

    if (i > text.length) {
      clearInterval(typeTimer);
      typing = false;
      nextBtn.style.display = "block";
    }
  }, 28);
}

function nextDialog() {
  const nextBtn = document.getElementById('dialog-next');
  const pageBtn = document.getElementById('page-next');
  const homeBtn = document.getElementById('home-btn');

  

  const list = dialogs[currentPage];

  if (typing) {
    clearInterval(typeTimer);
    typing = false;

    document.getElementById('dialog-text').innerHTML =
      list[dialogIndex] + '<span class="dialog-cursor"></span>';

    nextBtn.style.display = "block";
    return;
  }

  dialogIndex++;

  if (dialogIndex >= list.length) {
    nextBtn.style.display = "none";

    const index = pages.indexOf(currentPage);

    if (index === pages.length - 1) {
      homeBtn.style.display = "block";
    } else {
      pageBtn.style.display = "block";
    }

    return;
  }

  nextBtn.style.display = "none";
  typeDialog(list[dialogIndex]);
}

// Click anywhere on dialog to advance
document.getElementById('dialog-wrapper').addEventListener('click', nextDialog);

function goNextPage() {
  const index = pages.indexOf(currentPage);
  const next = pages[index + 1];

  if (!next) return;

  enterPage(next);
}

function goHome() {
  enterPage("home");
}

function openQuest(key) {
  const data = questData[key];

  if (!data) return;

  const modal = document.getElementById("questModal");
  const title = document.getElementById("modalTitle");
  const code = document.getElementById("modalCode");
  const reflection = document.getElementById("modalReflection");

  code.innerHTML = "";
  reflection.innerHTML = "";

  title.textContent = data.title;
  code.innerHTML = `<pre>${escapeHtml(data.code)}</pre>`;
  reflection.textContent = data.reflection;

  document.getElementById("modalContent")?.scrollTo(0, 0);

  modal.style.display = "flex";
}

document.getElementById("closeBtn").onclick = function () {
  const modal = document.getElementById("questModal");

  modal.style.display = "none";

  document.getElementById("modalCode").textContent = "";
  document.getElementById("modalReflection").textContent = "";
};

window.onclick = function (e) {
  const modal = document.getElementById("questModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

document.addEventListener("keydown", function (e) {
  const modal = document.getElementById("questModal");

  if (e.key === "Escape" && modal.style.display === "flex") {
    modal.style.display = "none";
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const itemModal = document.getElementById("itemModal");

    // only close if it's currently open
    if (itemModal.style.display === "flex" || itemModal.style.display === "block") {
      closeItem();
    }
  }
});

const questData = {
  variables: {
    title: "Activity #1 - Variables",
    code: `class Account {
              String owner;
              double balance;
              
              Account(String owner, double balance) {
                  this.owner = owner;
                  this.balance = balance;
              }
            }   
              
            public class TestAccount {
                public static void main(String[]args){

                    Account acc1 = new Account("Carlos", 5000);
                    Account acc2 = new Account("Diana", 7000);
                    Account acc3 = acc1;

                    acc2.balance = 8000;
                    acc3.owner = "Miguel";

                    System.out.println(acc1.owner + " " + acc1.balance);
                    System.out.println(acc2.owner + " " + acc2.balance);
                    System.out.println(acc3.owner + " " + acc3.balance);
                }
              }`,
    reflection: "REFLECTION: In this activity, I learned how to analyze the given program and trace the references step by step."
  },

  operators: {
    title: "Activity #2 - Operators",
    code: `PART 1:
          public class Bitwise {
              public static void main(String[] args) {

                  int a = 12; // 1100 
                  int b = 5; // 0101

                  int result = a & b;

                  System.out.println("Result: " + result);
              }
            }
              
          public class Ternary {
              public static void main(String[] args) {

                  int score = 75;

                  String result = (score >= 75) ? "Passed" : "Failed";

                  System.out.println("Result: " + result);
              }
            }
              
          public class AssignmentOperators {
              public static void main(String[] args) {

                  int number = 20;

                  number += 10;
                  number -= 5;
                  number *= 2;
                  number /= 5;

                  System.out.println("Final Value: " + number);
              }
            }
              
PART 2:
          public class MultipleOperators {
              public static void main(String[] args) {

                  int x = 7;
                  int y = 8;
                  int z = 1;

                  //1 Arithmetic	
                  int result1 = x * y + z;
                  System.out.println(result1);

                  //2 Unary	
                  int result2 = x++ + ++x;
                  System.out.println(result2);
                  
                  //3 Assignment operator	
                  y += 10;
                  System.out.println(y);
                  
                  //4 Bitwise operator
                  int result4 = y & z;
                  System.out.println(result4);
                  
                  //5 Relational operator
                  boolean result5 = x > y;
                  System.out.println(result5);
                  
                  //6 logical operator
                  boolean result6 = (x > 3) && (z < 5);
                  System.out.println(result6);                
              }
            }
          `,
    reflection: "REFLECTION: In this activity, i learned how to create a java program and used the specific operator required."
  },

  atm: {
    title: "Activity #3 - ATM System",
    code: `import java.util.Scanner;

            public class BasicATMSystemAguio {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                
                    double balance = 5000;
                    int choice;
                    int success = 0;
                  
                    while(true) {
                      System.out.println("\n==== ATM MENU ====");
                      System.out.println("1. Check Balance");
                      System.out.println("2. Deposit");
                      System.out.println("3. Withdraw");
                      System.out.println("4. Exit");
                      System.out.println("Enter Choice: ");
                      choice = input.nextInt();
                      
                      switch(choice) {
                      
                      case 1: 
                        System.out.println("Check Balance: " + balance + "Pesos");
                        break;
                    
                      case 2:
                        System.out.println("Enter Amount to deposit: ");
                        double deposit = input.nextDouble();
                        
                        if (deposit > 0) {
                          balance += deposit;
                          success++;
                          System.out.println("Deposit Successful!");
                          System.out.println("New Balance: " + balance);	
                        } else {
                          System.out.println("invalid amount!");
                        }
                        break;
                        
                      case 3:
                        System.out.println("Enter amount to withdraw:");
                        double withdraw = input.nextDouble();
                        
                        if (withdraw > 2000) {
                          System.out.println("Maximum withdraw is 2,000 pesos.");
                        } else if (withdraw > balance) {
                          System.out.println("Insufficient Balance!");
                        } else {
                          balance -= withdraw;
                          success++;
                          System.out.println("Withdraw Successfully!");
                          System.out.println("New Balance: " + balance);
                        }
                        break;
                        
                      case 4:
                        System.out.println("Exiting program....");
                        System.out.println("Total successful transaction: " + success);
                        return;
                        
                      default:
                        System.out.println("Invalid choice! Try again.");
                      }
                    }
                  }
                }`,
    reflection: "REFLECTION: In this activity, i learned how to create an basic ATM system using switch statement and if-else statement."
  },

  scholarship: {
    title: "Activity #4 - Scholarship System",
    code: ` 
            import java.util.Scanner;

            public class EnrollmentAssessmentSystemAguio {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                
                    System.out.println("Enter Student Name: ");
                    String name = input.nextLine();
                    
                    System.out.println("Enter SHS Strand(STEM, ABM, HUMMS, TVL, Others): ");
                    String strand = input.nextLine();
                    
                    System.out.println("Enter Entrance exam score (0 - 100): ");
                    int ExamScore = input.nextInt();
                    
                    System.out.println("Enter Interview score (0 - 100): ");
                    int interviewScore = input.nextInt();
                    
                    input.nextLine();
                    
                    System.out.print("First Screening Result (Pass/Fail): ");
                        String screening = input.nextLine();
                    
                    double finalScore = (ExamScore * 0.60) + (interviewScore * 0.40);
                    
                    String admissionResult;
                    
                    
                    if(screening.equalsIgnoreCase("Pass")) {
                      if (finalScore >= 85) {
                        admissionResult = "Admitted with scholarship";
                      } else if (finalScore >= 75) {
                        admissionResult = "Admitted";
                      } else if (finalScore >= 65) {
                        admissionResult = "Waitlisted";
                      } else {
                        admissionResult = "Not Qualified";
                      }
                    } else {
                      admissionResult = "Not Qualified";
                    }
                    
                    String program;
                    switch(strand.toUpperCase()) {
                    case "STEM":
                      program = "BSIT / CS";
                      break;
                    case "ABM":
                      program = "BSBA";
                    case "HUMMS":
                      program = "BSED / AB Communication";
                      break;
                    case "TVL":
                      program = "BSIT";
                      break;
                    default:
                      program = "General Program";
                    }
                  
                  System.out.println("/n==== ENROLLMENT ASSESSMENT RESULT ====");
                  System.out.println("Student Name: " + name);
                  System.out.println("SHS Strand: " + strand);
                  System.out.printf("Final Evaluation Score: %.2f/n", finalScore);
                  System.out.println("Admission Result: " + admissionResult);
                  System.out.println("Recommended Program: " + program);
                  
                  input.close();
              }
          }`,
    reflection: "REFLECTION: In this activity, i tried to integrate some of my learnings such as using if-else, switch and the scanner."
  },

  expense: {
    title: "Activity #5 - Expense Tracker",
    code: `
            import java.util.Scanner;

            public class ExpenseTrackerAguio {
              
                public static void displayTitle() {
                    System.out.println("=== Expense Tracker Program ===");
                }
              
                public static double calculateTotal(double food, double transportation, double other, double entertainment) {
                    return food + transportation + other + entertainment;
                }
              
                public static String checkBudget(double total, double budget) {
                    if (total > budget) {
                      return "You exceeded your budget!";
                    } else {
                      return "You are within your budget";
                    }
                  }
              
                public static void displayResult(double total, double budget, double remaining, String status) {
                    System.out.println("\n==== Expense Summary ====");
                    System.out.println("Total Expenses: " + total);
                    System.out.println("Budget: " + budget);
                    System.out.println("Remaining Budget: " + remaining);
                    System.out.println("Status: " + status);
                  }

                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                
                    displayTitle();
                    
                    System.out.println("Enter food expense: ");
                    double food = input.nextDouble();
                    
                    System.out.println("Enter transportation expense: ");
                    double transportation = input.nextDouble();
                    
                    System.out.println("Enter other expense: ");
                    double other = input.nextDouble();
                    
                    System.out.println("Enter entertainment expense: ");
                    double entertainment = input.nextDouble();
                    
                    System.out.println("Enter your budget: ");
                    double budget = input.nextDouble();
                    
                    double total = calculateTotal(food, transportation, other, entertainment);
                    
                    double remaining = budget - total;
                    
                    String status = checkBudget(total, budget);
                    
                    System.out.println("\nHello! Here's your expense report: ");
                    
                    displayResult(total, budget, remaining, status);
                    
                    input.close();
                  }
                }`,
    reflection: "REFLECTION: In this activity, i applied the use of void and non-void method and ofcourse  i applied what i learned in the previous activities."
  },

  seatwork1: {
    title: "Seatwork #1",
    code: `NO OUTPUT....`,
    reflection: "REFLECTION: In this seatwork, we did the unary operator and logical operator in our class. it's kinda challenging since it is hard to track the values of variables."
  },

  wallet: {
    title: "Seatwork #2 - Smart Wallet",
    code: `
            import java.util.Scanner;

            public class Seatwork {

              public static void main(String[] args) {
                
                  Scanner scan = new Scanner(System.in);
                
                  double balance = 5000;
                  int choice;
                  int success = 0;
                  
                  while (true) {
                    System.out.println("/n==== SMART WALLET MENU ====");
                    System.out.println("1. View Balance");
                    System.out.println("2. Cash In");
                    System.out.println("3. Send Money");
                    System.out.println("4. Exit");
                    System.out.println("Enter Choice: ");
                    choice = scan.nextInt();
                    
                    switch (choice) {
                      
                    case 1:
                      System.out.println("Current Balance: " + balance + " Pesos");
                      break;
                      
                    case 2:
                      System.out.println("Enter amount to cash in: ");
                      double cashIn = scan.nextDouble();
                      
                      if (cashIn > 0) {
                        balance += cashIn;
                        success++;
                        System.out.println("Cash in Successful!");
                        System.out.println("New Balance: " + balance);
                        
                      } else {
                        System.out.println("Invalid Amount!");
                      }
                      break;
                      
                    case 3:
                      System.out.println("Enter amount to send: ");
                      double send = scan.nextDouble();
                      
                      if (send < 100) {
                        System.out.println("Minimum Amount is 100 pesos.");
                      } else if (send > 1500) {
                        System.out.println("Maximum per transaction is 1500 pesos.");
                      } else if (send > balance) {
                        System.out.println("Insufficient balance.");
                      } else {
                        balance -=send;
                        success++;
                        System.out.println("Money sent successfully!");
                      }
                      break;
                      
                    case 4:
                      System.out.println("Exiting program....");
                      System.out.println("Total Successfull Transactions: " + success);
                      return;
                      
                    default:
                      System.out.println("Invalid choice! Try again.");
                    }
                  }	
                }
              }`,
    reflection: "REFLECTION: In this seatwork, i created a simple smart wallet menu where i can view valance, cash in and send money. i used while loop, switch case and if-else statement."
  },

  age: {
    title: "Seatwork #3 - Age Analyzer",
    code: `
            import java.util.Scanner;

            public class StudentAgeAnalyzerAguio {
              
              public static String ageCategory(int age) {
                if (age >= 0 && age <= 12) {
                  return "Child";
                }else if (age >= 13 && age <= 19) {
                  return "Teenage";
                }else if (age >= 20 && age <= 59) {
                  return "Adult";
                } else {
                  return "Senior Citizen";
                }
              }

              public static void main(String[] args) {
                
                Scanner input = new Scanner(System.in);
                
                System.out.println("Enter Student Name: ");
                String name = input.nextLine();
                
                System.out.println("Enter Student Age: ");
                int age = input.nextInt();
                
                String category = ageCategory(age);
                
                System.out.println("/nStudent Name: " + name);
                System.out.println("Age: " + age);
                System.out.println("Category: " + category);
              }	
            }`,
    reflection: "REFLECTION: In this seatwork, i used a non-void method where i store the if-else statement of age category."
  },

  quiz1: {
    title: "Midterm Quiz #1",
    code: `NO OUTPUT....`,
    reflection: "REFLECTION: this is our first midterm quiz and in my experience i applied all the topics i learned in this subject. the concepts is not that hard to recall."
  },

  assignment1: {
    title: "Assignment #1 - Introduction to Java",
    code: `public class Main {
  public static void main(String[] args){
    System.out.println("Hello World");
  }
}`,
    reflection: "REFLECTION: This is where our prof introduced java to us. we made an assignment that is hand written where we explain what is the java and its concept."
  }
};

function showArmory(type, el) {
  const title = document.getElementById("armory-title");
  const container = document.getElementById("armory-items");

  // reset active tab UI
  document.querySelectorAll(".armory-tab").forEach(tab => {
    tab.classList.remove("active");
  });
  el.classList.add("active");

  container.innerHTML = "";

  // change title + content based on tab
  let items = [];

  if (type === "activities") {
    title.innerText = "⚔ Activities Arsenal";
    items = getActivities();
  } 
  else if (type === "seatworks") {
    title.innerText = "🛡 Seatworks Vault";
    items = getSeatworks();
  } 
  else if (type === "quizzes") {
    title.innerText = "📜 Quiz Chamber";
    items = getQuizzes();
  } 
  else if (type === "assignments") {
    title.innerText = "📦 Assignment Archive";
    items = getAssignments();
  }

  // render new items ONLY
  items.forEach(item => {
    container.innerHTML += `
      <div class="armory-item" onclick='openItem(${JSON.stringify(item)})'>
        <div class="item-icon">⚔</div>
        <div class="item-info">
          <div class="item-name">${item.title}</div>
          <div class="item-desc">${item.desc}</div>
        </div>
      </div>
    `;
  });
}

function getActivities() {
  return [
    { title: "Activity #1 - Variables", desc: "Variables", file: "files/BSIT%202-3_Aguio_John_Wayne_Carl_CodeAnalysisActivity%231.pdf", reflection: 'Learned variables and data storage.' },
    { title: "Activity #2 - Operators", desc: "Operators", file: "files/BSIT%202-3_Aguio_John_Wayne_Carl_OperatorsActivity%232.pdf", reflection: 'Learned Java operators.' },
    { title: "Activity #3 - ATN System ", desc: "ATM System", file: "files/2-3_AGUIO_JOHN%20WAYNE%20CARL%20P._BasicATMSystem.pdf", reflection: 'Used switch and loops.'},
    { title: "Activity #4 - Scholarship System", desc: "Scholarship System", file: "files/2-3_AGUIO_JOHN%20WAYNE%20CARL%20P._Student%20Enrollment%20Assessment%20System.pdf", reflection:'Applied decision making.'},
    { title: "Activity #5 - Expense Tracker", desc: "Expense Tracker", file: "files/ExpenseTrackerAguio.pdf",reflection: 'Used methods and functions.' }
  ];
}

function getSeatworks() {
  return [
    { title: "Seatwork #1", desc: "Unary operator"},
    { title: "Seatwork #2", desc: "Smart Wallet System", file: "files/BSIT2-3_Aguio_John%20Wayne%20Carl_SmartWalletSystem.pdf", reflection: 'Used if-else statements' },
    { title: "Seatwork #3", desc: "Basics", file: "files/2-3_Aguio_John%20Wayne%20Carl%20P._StudentAgeAnalyzer.pdf", reflection: 'i used a non-void method where i store the if-else statement of age category.' }
  ];
}

function getQuizzes() {
  return [
    { title: "Midterm Quiz #1", desc: "OOP Basics", file: "files/...", reflection: 'this is our first midterm quiz and in my experience i applied all the topics i learned in this subject. the concepts is not that hard to recall.' }
  ];
}

function getAssignments() {
  return [
    { title: "Assignment #1", desc: "Java Intro", file: "files/Midterm%20Assignment%20%231_AGUIO.pdf", reflection: 'This is where our prof introduced java to us. we made an assignment that is hand written where we explain what is the java and its concept.' }
  ];
}

function openItem(data) {
  document.getElementById("itemTitle").innerText = data.title;
  document.getElementById("itemViewer").src = data.file;
  document.getElementById("itemReflection").innerText = data.reflection;

  const downloadBtn = document.getElementById("itemDownload");
  downloadBtn.href = data.file;

  const modal = document.getElementById("itemModal");
  modal.style.display = "flex"; // IMPORTANT FIX
}

function closeItem() {
  const modal = document.getElementById("itemModal");

  modal.style.display = "none";
  document.getElementById("itemViewer").src = "";
}

// ─── STICKY NOTES ───
const colors = ['note-yellow','note-pink','note-green','note-blue','note-purple'];
const rotations = ['-3deg','-1deg','2deg','1deg','-2deg','3deg','-1.5deg','1.5deg'];

const defaultNotes = [
  { name: 'Jordan', text: 'The pixel art character is adorable 💜', color: 'note-purple' },
  { name: 'Riley', text: 'Keep up the great work! Can\'t wait to see the final chapter!', color: 'note-pink' },
];

function renderNotes() {
  const wall = document.getElementById('notes-wall');
  const stored = JSON.parse(localStorage.getItem('portfolio-notes') || '[]');
  const all = [...defaultNotes, ...stored];
  wall.innerHTML = all.map((n, i) => {
    const rot = rotations[i % rotations.length];
    return `<div class="sticky-note ${n.color}" style="--rot:${rot}">
      <div class="note-pin"></div>
      <div>${escapeHtml(n.text)}</div>
      <span class="note-author">— ${escapeHtml(n.name)}</span>
    </div>`;
  }).join('');
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function addNote() {
  const name = document.getElementById('s-name').value.trim() || 'Anonymous';
  const text = document.getElementById('s-note').value.trim();
  if (!text) { showToast('⚠ Please write something!'); return; }

  const stored = JSON.parse(localStorage.getItem('portfolio-notes') || '[]');
  const color = colors[Math.floor(Math.random() * colors.length)];
  stored.push({ name, text, color });
  if (stored.length > 20) stored.shift();
  localStorage.setItem('portfolio-notes', JSON.stringify(stored));

  document.getElementById('s-name').value = '';
  document.getElementById('s-note').value = '';
  renderNotes();
  showToast('📌 Note pinned to the board!');
}

function sendContact() {
  const name = document.getElementById('c-name').value.trim();
  const email = document.getElementById('c-email').value.trim();
  const msg = document.getElementById('c-msg').value.trim();
  if (!name || !msg) { showToast('⚠ Please fill in required fields!'); return; }
  document.getElementById('c-name').value = '';
  document.getElementById('c-email').value = '';
  document.getElementById('c-msg').value = '';
  showToast('✓ Message sent! Thank you, ' + name + '!');
}

function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

renderNotes();

window.addEventListener("DOMContentLoaded", () => {
  enterPage("home");
});

document.addEventListener("DOMContentLoaded", () => {
  const bgm = document.getElementById("bgm");
  const bgmBtn = document.getElementById("bgm-toggle");

  let isPlaying = localStorage.getItem("bgm") === "on";

  function updateUI() {
    bgmBtn.classList.toggle("on", isPlaying);
  }

  function playBGM() {
    bgm.play().catch(() => {});
  }

  function pauseBGM() {
    bgm.pause();
  }

  if (isPlaying) playBGM();
  updateUI();

  bgmBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      playBGM();
      localStorage.setItem("bgm", "on");
    } else {
      pauseBGM();
      localStorage.setItem("bgm", "off");
    }

    updateUI();
  });

  document.addEventListener("click", () => {
    if (isPlaying) playBGM();
  }, { once: true });

  bgm.volume = 0.3;
});