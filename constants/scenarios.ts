
import type { Scenario } from '../types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'sql-injection',
    title: 'SQL Injection',
    learningObjective: 'Understand how unsanitized inputs can be used to manipulate database queries.',
    teacherCue: "Ask students why we shouldn't trust user input directly.",
    animationComponent: 'SqlInjectionAnimation',
    badgeName: 'SQL Sleuth',
    storyboard: [
      { narration: "A user enters their name into a login form on the School-Web portal.", onScreenText: "Login: user' OR '1'='1", hint: "An attacker types a tricky command instead of a name.", duration: 2000, logMessage: "[WEB] Connection received from 1.2.3.4" },
      { narration: "The web application takes this input and puts it directly into a database query.", onScreenText: "SELECT * FROM users WHERE name = 'user' OR '1'='1'", hint: "The command becomes part of the database instruction.", duration: 2500, logMessage: "[SQL] Executing un-sanitized query...", healthImpact: -1 },
      { narration: "The database sees '1'='1', which is always true, and grants access.", onScreenText: "[DATABASE] Query successful. Access granted.", hint: "The database is tricked into thinking the login is valid.", duration: 2000, logMessage: "[SQL] !! ERROR: Tautology detected in WHERE clause." },
      { narration: "The database box flips, revealing sensitive data that shouldn't be public.", onScreenText: "Private Data Leaked!", hint: "The attacker now has access to private information.", duration: 2000, logMessage: "[SYS] CRITICAL: Unauthorized data access event.", healthImpact: -1 },
      { narration: "To fix this, use 'parameterized queries' which separate commands from data.", onScreenText: "MITIGATION: Use Parameterized Queries", hint: "This technique keeps data and instructions separate.", duration: 3000, logMessage: "[SEC] Mitigation protocol initiated: Parameterize inputs.", healthImpact: 2 },
    ],
    quiz: [
      {
        question: 'What is the best way to prevent SQL Injection?',
        options: ['Blocking all users', 'Using parameterized queries', 'Hiding the login page', 'Making passwords longer'],
        correctAnswerIndex: 1,
        explanation: 'Parameterized queries ensure that user input is treated as data, not as part of the SQL command, which prevents injection attacks.',
      },
    ],
  },
  {
    id: 'phishing',
    title: 'Phishing Email',
    learningObjective: 'Recognize deceptive emails designed to steal credentials.',
    teacherCue: 'Discuss clues in an email that might indicate it is a phishing attempt.',
    animationComponent: 'PhishingAnimation',
    badgeName: 'Phish Finder',
    storyboard: [
        { narration: "A student receives an email that looks like it's from the school library.", onScreenText: "From: School-Libary.com [URGENT ACTION REQUIRED]", hint: "The email looks official but has a small typo.", duration: 2000 },
        { narration: "The email contains a link, promising a prize for logging in.", onScreenText: "Click here to claim your prize!", hint: "Attackers often use tempting offers to get you to click.", duration: 2000 },
        { narration: "The student clicks the link, which has a hook icon on it.", onScreenText: "", hint: "The link is a trap, or 'phishing hook'.", duration: 1500, healthImpact: -1 },
        { narration: "A fake login page appears that looks exactly like the real one.", onScreenText: "Enter your username and password.", hint: "This page is controlled by the attacker to steal information.", duration: 2500 },
        { narration: "After the student enters their password, it's sent to the attacker.", onScreenText: "Credentials Stolen!", hint: "The attacker now has the student's password.", duration: 2000, healthImpact: -1 },
        { narration: "To prevent this, always check the sender's address and enable Multi-Factor Authentication (MFA).", onScreenText: "MITIGATION: Check Sender & Use MFA", hint: "MFA adds an extra layer of security.", duration: 3000, healthImpact: 2 },
    ],
    quiz: [
      {
        question: 'What is a common sign of a phishing email?',
        options: ['It comes from a friend', 'It has typos or a sense of urgency', 'It has no links', 'It is very short'],
        correctAnswerIndex: 1,
        explanation: 'Phishing emails often contain spelling errors, create a false sense of urgency, and use slightly incorrect sender addresses to trick you.',
      },
    ],
  },
  {
    id: 'xss',
    title: 'Cross-Site Scripting (XSS)',
    learningObjective: 'Learn how malicious scripts can be injected into websites.',
    teacherCue: 'Explain the difference between your own browser and the website\'s server.',
    animationComponent: 'XssAnimation',
    badgeName: 'Script Guardian',
    storyboard: [
      { narration: "An attacker posts a comment on the school's blog.", onScreenText: "Great post! <script>...</script>", hint: "The comment includes a hidden, malicious script.", duration: 2500, healthImpact: -1 },
      { narration: "The website saves the comment to its database without checking it.", onScreenText: "[DATABASE] Comment Saved", hint: "The dangerous script is now stored on the website.", duration: 2000 },
      { narration: "Later, the school principal views the blog page.", onScreenText: "Loading comments...", hint: "The principal is about to view the page with the bad comment.", duration: 2000 },
      { narration: "The website shows the malicious comment, and the script runs in the principal's browser.", onScreenText: "ALERT: Script is running!", hint: "The script activates in the victim's web browser.", duration: 2500, healthImpact: -1 },
      { narration: "The script steals information from the principal's session.", onScreenText: "Session Compromised!", hint: "The attacker can now act as the principal.", duration: 2000 },
      { narration: "Prevention involves 'output encoding'—turning scripts into plain, safe text.", onScreenText: "MITIGATION: Output Encoding", hint: "This neutralizes the script before it's displayed.", duration: 3000, healthImpact: 2 },
    ],
    quiz: [
      {
        question: 'In an XSS attack, where does the malicious script run?',
        options: ['On the web server', 'In the database', 'In the victim\'s web browser', 'On the attacker\'s computer'],
        correctAnswerIndex: 2,
        explanation: 'Cross-Site Scripting attacks execute in the browser of someone visiting the compromised page, not on the server.',
      },
    ],
  },
  {
    id: 'default-creds',
    title: 'Default Credentials',
    learningObjective: 'Understand the risk of not changing default usernames and passwords.',
    teacherCue: 'Discuss why manufacturers ship devices with simple, default passwords.',
    animationComponent: 'DefaultCredsAnimation',
    badgeName: 'Password Protector',
    storyboard: [
      { narration: "A new server is installed on the school network.", onScreenText: "[NEW SERVER] Online", hint: "It comes with a default username and password.", duration: 2000 },
      { narration: "An attacker scans the network for devices with default credentials.", onScreenText: "Scanning for 'admin:admin'", hint: "They use common defaults to find easy targets.", duration: 2500 },
      { narration: "They find the server and the 'admin:admin' combination works.", onScreenText: "ACCESS GRANTED", hint: "The door to the admin panel just swings open.", duration: 2000, healthImpact: -2 },
      { narration: "The attacker now has full control over the new server.", onScreenText: "System Compromised", hint: "They can do anything they want on the server.", duration: 2000 },
      { narration: "Always change default passwords immediately after installing a new device.", onScreenText: "MITIGATION: Change Default Passwords", hint: "A simple step that makes a huge difference.", duration: 3000, healthImpact: 2 },
    ],
    quiz: [
      {
        question: "What should you do first with a new router or server?",
        options: ["Turn it off", "Change the default password", "Connect it to everything", "See how fast it is"],
        correctAnswerIndex: 1,
        explanation: "Changing the default password is a critical first step to securing any new network device.",
      }
    ]
  },
  {
    id: 'misconfigured-share',
    title: 'Misconfigured File Share',
    learningObjective: 'Learn why access controls on shared folders are important.',
    teacherCue: 'Use the analogy of a public library versus a private diary for file access.',
    animationComponent: 'MisconfiguredShareAnimation',
    badgeName: 'Access Controller',
    storyboard: [
        { narration: "A file server has a folder that's accidentally open to everyone.", onScreenText: "/shared-files (Permissions: Everyone)", hint: "The folder has no restrictions on who can see it.", duration: 2500 },
        { narration: "Inside is a sensitive document, like 'StudentGrades.xlsx'.", onScreenText: "StudentGrades.xlsx", hint: "Important files are unprotected.", duration: 2000 },
        { narration: "Anyone on the network can open the folder and access the file.", onScreenText: "Accessing file...", hint: "No password or special rights are needed.", duration: 2500, healthImpact: -1 },
        { narration: "This is a major data leak caused by a simple mistake.", onScreenText: "Data Leaked!", hint: "Private information is now public.", duration: 2000, healthImpact: -1 },
        { narration: "The principle of 'least privilege' fixes this: only give access to those who need it.", onScreenText: "MITIGATION: Least Privilege Access", hint: "If you don't need it, you don't get access.", duration: 3000, healthImpact: 2 },
    ],
    quiz: [
      {
        question: "The 'Principle of Least Privilege' means:",
        options: ["Giving everyone admin access", "Giving users the minimum access they need to do their job", "Giving no one access", "Privileges are not important"],
        correctAnswerIndex: 1,
        explanation: "This principle reduces risk by ensuring users and systems can only access the specific resources they absolutely need.",
      }
    ]
  },
   {
    id: 'unpatched-service',
    title: 'Unpatched Service',
    learningObjective: 'Understand the importance of keeping software updated.',
    teacherCue: 'Compare software patches to getting a vaccine for a sickness.',
    animationComponent: 'UnpatchedServiceAnimation',
    badgeName: 'Patch Master',
    storyboard: [
        { narration: "A school server is running an old, outdated piece of software.", onScreenText: "Web Server v1.0 (Old)", hint: "This version has a known security weakness.", duration: 2500 },
        { narration: "A warning icon appears, showing a known vulnerability exists.", onScreenText: "VULNERABILITY DETECTED", hint: "Hackers know how to break this old version.", duration: 2000 },
        { narration: "An attacker exploits this weakness to gain control of the server.", onScreenText: "Exploit successful!", hint: "The server gets 'sick' from the attack.", duration: 2500, healthImpact: -2 },
        { narration: "The server is now compromised because it wasn't updated.", onScreenText: "System Compromised", hint: "The attacker is in control.", duration: 2000 },
        { narration: "Regularly updating or 'patching' software closes these security holes.", onScreenText: "MITIGATION: Patch Management", hint: "Updates keep your software healthy and safe.", duration: 3000, healthImpact: 2 },
    ],
    quiz: [
      {
        question: "Why is it important to update your apps and operating system?",
        options: ["To get new emojis", "To fix bugs and security vulnerabilities", "To make it run slower", "You should never update"],
        correctAnswerIndex: 1,
        explanation: "Software updates frequently contain critical security 'patches' that protect you from newly discovered threats.",
      }
    ]
  },
   {
    id: 'weak-encryption',
    title: 'Weak Encryption',
    learningObjective: 'Recognize the importance of strong encryption for protecting data.',
    teacherCue: 'Describe encryption as locking a message in a box with a secret key.',
    animationComponent: 'WeakEncryptionAnimation',
    badgeName: 'Crypto Keeper',
    storyboard: [
        { narration: "A backup of student data is saved to a drive.", onScreenText: "[BACKUP] student_data.zip", hint: "The file is protected, but with a weak lock.", duration: 2500 },
        { narration: "The file is encrypted, but the lock icon has a key leaking a glow.", onScreenText: "Encryption: WEAK", hint: "The encryption is easy to break.", duration: 2000 },
        { narration: "An attacker finds the drive and easily breaks the weak encryption.", onScreenText: "Breaking encryption...", hint: "It's like picking a very simple lock.", duration: 2500, healthImpact: -1 },
        { narration: "The contents of the backup file are now visible.", onScreenText: "Data Decrypted!", hint: "The attacker can read all the private data.", duration: 2000, healthImpact: -1 },
        { narration: "Using strong, modern encryption is essential for protecting stored data.", onScreenText: "MITIGATION: Use Strong Encryption", hint: "A strong lock keeps your data safe.", duration: 3000, healthImpact: 2 },
    ],
    quiz: [
      {
        question: "What is the goal of encryption?",
        options: ["To make files bigger", "To delete data", "To make data unreadable to unauthorized people", "To share data with everyone"],
        correctAnswerIndex: 2,
        explanation: "Encryption scrambles data so that it can only be read by someone who has the correct key, protecting it from prying eyes.",
      }
    ]
  },
   {
    id: 'privilege-escalation',
    title: 'Privilege Escalation',
    learningObjective: 'See how attackers can move from a low-level account to a powerful one.',
    teacherCue: 'Use the analogy of a visitor pass versus a master key for a building.',
    animationComponent: 'PrivilegeEscalationAnimation',
    badgeName: 'Privilege Warden',
    storyboard: [
        { narration: "An attacker gains access to a regular student laptop account.", onScreenText: "Access: student-01 (Low Privilege)", hint: "They have very limited permissions.", duration: 2500, healthImpact: -1 },
        { narration: "They find a flaw in an application on the laptop.", onScreenText: "Finding vulnerability...", hint: "A mistake in a program can be a doorway.", duration: 2000 },
        { narration: "Using this flaw, they 'climb a ladder' to a higher privilege level.", onScreenText: "", hint: "They are escalating their permissions.", duration: 2500 },
        { narration: "They reach the 'Admin' box, giving them full control of the laptop.", onScreenText: "Access: ADMIN (High Privilege)", hint: "Now they can do anything on this machine.", duration: 2000, healthImpact: -1 },
        { narration: "Running programs with the lowest privilege possible makes this much harder.", onScreenText: "MITIGATION: Least Privilege", hint: "Don't run as an admin unless you have to.", duration: 3000, healthImpact: 2 },
    ],
    quiz: [
      {
        question: "Privilege Escalation means an attacker...",
        options: ["Sends a lot of emails", "Gains more permissions than they started with", "Deletes their account", "Logs out"],
        correctAnswerIndex: 1,
        explanation: "It's the process of exploiting a bug or misconfiguration to gain elevated access to resources that are normally restricted.",
      }
    ]
  },
   {
    id: 'lateral-movement',
    title: 'Lateral Movement',
    learningObjective: 'Understand how attackers move through a network after getting in.',
    teacherCue: 'Explain this as an intruder getting in one window, then unlocking other doors from the inside.',
    animationComponent: 'LateralMovementAnimation',
    badgeName: 'Network Sentinel',
    storyboard: [
        { narration: "An attacker first compromises one student laptop.", onScreenText: "[COMPROMISED] Student-Laptop-01", hint: "This is their initial foothold.", duration: 2500, healthImpact: -1 },
        { narration: "From there, they scan the network and find the Library Server.", onScreenText: "Pinging Library-Server...", hint: "They look for other machines to jump to.", duration: 2000 },
        { narration: "They use the laptop's access to attack and control the server.", onScreenText: "[COMPROMISED] Library-Server", hint: "They are moving 'laterally' across the network.", duration: 2500, healthImpact: -1 },
        { narration: "From the server, they can now see and attack an Admin's computer.", onScreenText: "Pinging Admin-PC...", hint: "Each step gets them closer to more important targets.", duration: 2000 },
        { narration: "'Network segmentation' can stop this by putting walls between computers.", onScreenText: "MITIGATION: Network Segmentation", hint: "This contains a breach to one area.", duration: 3000, healthImpact: 2 },
    ],
    quiz: [
      {
        question: "What is network segmentation designed to prevent?",
        options: ["Slow internet", "Attackers moving freely between computers", "Forgetting passwords", "Website errors"],
        correctAnswerIndex: 1,
        explanation: "By dividing a network into smaller, isolated segments, it makes it much harder for an attacker to move from a less important computer to a critical one.",
      }
    ]
  },
   {
    id: 'ddos',
    title: 'DDoS Attack',
    learningObjective: 'Learn how overwhelming a service with traffic can make it unavailable.',
    teacherCue: 'Use the analogy of too many people trying to get through one door at the same time.',
    animationComponent: 'DdosAnimation',
    badgeName: 'Traffic Controller',
    storyboard: [
        { narration: "The school's website is running normally.", onScreenText: "School-Web: OK", hint: "Requests are coming in at a normal pace.", duration: 2500 },
        { narration: "Suddenly, a huge flood of tiny dots representing traffic hits the website.", onScreenText: "INCOMING TRAFFIC: 1,000,000 requests/sec", hint: "This is a Distributed Denial of Service (DDoS) attack.", duration: 2000, healthImpact: -1 },
        { narration: "The website's server gets overwhelmed and cannot keep up.", onScreenText: "SERVER OVERLOADED", hint: "The spinner icon slows down to a crawl.", duration: 2500, healthImpact: -1 },
        { narration: "Legitimate users can no longer access the website.", onScreenText: "SERVICE UNAVAILABLE", hint: "The service is denied to real users.", duration: 2000 },
        { narration: "Using a CDN and 'rate limiting' can absorb and block these attacks.", onScreenText: "MITIGATION: CDN & Rate Limiting", hint: "These services act as a shield against traffic floods.", duration: 3000, healthImpact: 2 },
    ],
    quiz: [
      {
        question: "What is the main goal of a DDoS attack?",
        options: ["To steal data", "To make a website or service unavailable", "To guess passwords", "To send spam emails"],
        correctAnswerIndex: 1,
        explanation: "The goal is to overwhelm a target with so much traffic that it can no longer serve legitimate users, effectively shutting it down.",
      }
    ]
  },
  {
    id: 'total-compromise',
    title: 'Total Network Compromise',
    learningObjective: 'See how multiple attack vectors can be chained for a massive breach.',
    teacherCue: 'Discuss how a single weak point can lead to a full system failure.',
    animationComponent: 'TotalCompromiseAnimation',
    badgeName: 'Cybersecurity Champion',
    storyboard: [
        { narration: "It begins with a single phishing email to a student.", onScreenText: "Phishing email opened.", hint: "One click is all it takes to start the chain.", duration: 2000, healthImpact: -1 },
        { narration: "The student's laptop is compromised, giving the attacker a foothold.", onScreenText: "Laptop Compromised.", hint: "The attacker is now inside the network.", duration: 2000 },
        { narration: "Using the laptop, they move laterally to the unpatched Library Server.", onScreenText: "Lateral Movement to Server.", hint: "They exploit an old service to gain more access.", duration: 2500, healthImpact: -1 },
        { narration: "From the server, they escalate privileges to become an Admin.", onScreenText: "Privilege Escalation: ADMIN", hint: "Now they have the keys to the kingdom.", duration: 2500, healthImpact: -1 },
        { narration: "The attacker launches a DDoS attack from inside, bringing the whole network down.", onScreenText: "DDoS Attack Launched!", hint: "The entire school network is now offline.", duration: 3000, healthImpact: -2 },
        { narration: "A multi-layered defense (patching, MFA, segmentation) is the only way to stop a chained attack.", onScreenText: "MITIGATION: Defense-in-Depth", hint: "Multiple layers of security are essential.", duration: 3000, healthImpact: 5 },
    ],
    quiz: [
      {
        question: "What is the concept of 'Defense-in-Depth'?",
        options: ["Having one very strong password", "Using multiple layers of security controls", "Only defending the most important computer", "Hiring a single security guard"],
        correctAnswerIndex: 1,
        explanation: "Defense-in-Depth is a strategy that uses multiple, overlapping security measures to protect a network. If one layer fails, another is there to stop the attack.",
      }
    ]
  },
];