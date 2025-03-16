# Git Workflow

## 🎯 Goal  
Establish a consistent Git workflow for development and issue tracking.

---

## 🚀 Branching Strategy
- **main** → Protected branch → Production-ready code only  
- **dev** → Development branch → Active feature work  
- **feature/{branch-name}** → New features  
- **fix/{branch-name}** → Bug fixes  
- **docs/{branch-name}** → Documentation updates  

---

## ✅ Creating a New Branch
Create a branch based on `dev`:
```bash
git checkout -b feature/{branch-name}
```

---

## ✅ Making Commits
Follow the **conventional commit format**:
```
type(scope): message
```
### Examples:
- `feat(series): Add new series tracking feature`
- `fix(sync): Resolve issue with Plex sync conflicts`
- `docs(readme): Update setup instructions`

---

## ✅ Pushing Changes
Push to the remote branch:
```bash
git push origin feature/{branch-name}
```

---

## ✅ Creating a Pull Request
- Create a pull request from `feature/{branch-name}` → `dev`  
- Assign reviewers  
- Add a description of changes and relevant issue numbers  

---

## ✅ Closing Issues in Commits
To automatically close issues:
```bash
git commit -m "fix(sync): Resolve Plex sync issue. Closes #12"
```

---

## ✅ Merging Strategy
1. Use **Squash and Merge** for a clean commit history.  
2. Keep `main` branch protected → No direct commits allowed.  
3. After merging to `main`, delete the feature branch.  

---

## 📝 Notes  
Following this workflow ensures clean, traceable commits and simplifies rollbacks.