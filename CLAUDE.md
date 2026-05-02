# IRIgotchi

## IRI Status Display
Every response MUST start with the IRI status line from the UserPromptSubmit hook. The hook output appears in system reminders as "UserPromptSubmit hook success: IRI ...". Extract that status and display it as the first line of every response, formatted as:

```
> IRI [face] [bar] [score]/10 ([mood]) | last: [n] | msgs: [n]
```

This is critical — the user cannot see hook output directly, so you must relay it.
