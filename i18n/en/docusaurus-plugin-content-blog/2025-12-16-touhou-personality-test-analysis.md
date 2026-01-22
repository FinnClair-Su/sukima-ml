---
slug: touhou-personality-test-analysis
title: "Revealing the Algorithm Behind the 'Touhou Project Personality Test'"
authors: [xinxian]
tags: [Touhou Project, Tech, Algorithm, Reverse Engineering]
date: 2025-12-16
---

# Revealing the Algorithm Behind the "Touhou Project Personality Test"

Today, the mini-test "Which Touhou Character Are You?" went viral in various QQ groups. As a proud CS student and the organizer of a Touhou doujin circle, I couldn't help but wonder: How does this test actually work? Does it truly use machine learning to match characters, or is it just simple conditional logic? Is my intuition about a "six-dimensional vector" matching actually correct?

To solve this mystery, I analyzed the source code of the webpage. In this article, I will take you deep into the code to see how your "soul character" is actually calculated.

<!-- truncate -->

## Core Discovery: Six Dimensions Are Not Just Vectors

After reverse-engineering the source code (mainly the `index-*.js` files), I found that the test is indeed based on a **six-dimensional personality model**. Similar to the well-known MBTI (four-dimensional), this test introduces two additional dimensions, constructing a more complex classification system.

### 1. Twelve Sub-dimensions and Six Axes

The code defines 12 basic dimensions, which are paired in opposites to form 6 core personality axes. Here is a snippet of the definitions found in the code:

```javascript
// Dimension mapping in the code
const dimensions = [
    {code:"e", name:"Extroverted", opposite:"i", oppositeName:"Introverted"},
    {code:"n", name:"Intuitive", opposite:"s", oppositeName:"Sensing"},
    {code:"t", name:"Thinking", opposite:"f", oppositeName:"Feeling"},
    {code:"p", name:"Perceiving", opposite:"j", oppositeName:"Judging"},
    {code:"a", name:"Skeptical", opposite:"o", oppositeName:"Accommodating"}, // A vs O
    {code:"h", name:"Pragmatic", opposite:"c", oppositeName:"Conformist"}  // H vs C
];
```

These six pairs of traits are:
1.  **E (Extroverted) vs I (Introverted)**: The classic extraversion/intraversion dimension.
2.  **N (Intuitive) vs S (Sensing)**: Similar to MBTI's intuition/sensing.
3.  **T (Thinking) vs F (Feeling)**: Thinking/Feeling.
4.  **P (Perceiving) vs J (Judging)**: Perceiving/Judging.
5.  **A (Skeptical) vs O (Accommodating)**: A unique dimension, possibly corresponding to Agreeableness in the Big Five model.
6.  **H (Pragmatic) vs C (Conformists)**: Measuring attitude towards new things, possibly corresponding to Openness.

### 2. Scoring Algorithm

The test consists of several questions, each corresponding to one of the 12 sub-dimensions. When you select options A/B/C/D, it adds 1 to 4 points to that specific dimension.

```javascript
// Pseudocode for the scoring logic
let scores = { e:0, i:0, n:0, s:0, ... }; // Initialized to 0

userAnswers.forEach(answer => {
    // Each question has a fixed dimension attribute, e.g., 'e'
    const dimension = answer.dimension; 
    // answer.score is 1-4 points
    scores[dimension] += answer.score;
});
```

It's not that every question is a tug-of-war between E and I; rather, some questions specifically measure E, and some specifically measure I. Finally, the system calculates the total scores for E and I separately.

### 3. "Duel" and Personality Code Generation

Here comes the critical step. The system doesn't directly use these 12 detailed scores for similarity calculations (like cosine similarity). Instead, it uses a **binarization** strategy, similar to MBTI type classification.

For each pair of axes, it compares the total scores of the two sub-dimensions, and the higher one wins:

```javascript
const resultCode = [
    scores.e > scores.i ? "e" : "i",
    scores.n > scores.s ? "n" : "s",
    scores.t > scores.f ? "t" : "f",
    scores.p > scores.j ? "p" : "j",
    scores.a > scores.o ? "a" : "o",
    scores.h > scores.c ? "h" : "c"
].join("");
```

This generates a 6-letter string (personality code), such as `"entpah"` or `"isfjoc"`.

With 6 dimensions and 2 possibilities each, there are a total of $2^6 = 64$ possible personality combinations.

### 4. Character Matching Mechanism

You might think the system calculates the Euclidean distance between your score vector and each character's vector to find the "closest" character. But in reality, the logic is very blunt: **Exact Lookup**.

The system directly takes the generated 6-letter code and queries the database:

```javascript
// Pseudocode
let characters = await database.query("characters")
    .where("dimension_code", "==", resultCode);
```

*   **Hit**: If a character's setting in the database happens to match this code (e.g., Reimu is set as `entpah`), you are matched with Reimu.
*   **Collision**: If the same code corresponds to multiple characters, the system picks one at **random**.
*   **Miss (Fallback)**: This is the most interesting part. What happens if **no** character in the database matches your code exactly? The code shows it **returns a character at random**!

```javascript
if (matchedCharacters.length === 0) {
    const allCharacters = await getAllCharacters();
    // Pick a lucky character randomly
    finalCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
}
```

This means that if your personality combination is very unique (or very weird) and can't be found in the preset Touhou character pool, you actually get a completely random result. This explains why sometimes the results feel "a bit off."

## Technical Summary

From a technical perspective, this H5 app uses the following stack:
*   **Frontend**: React + Vite bundling.
*   **Backend**: Uses Supabase (BaaS) for database services; the frontend reads questions and character data directly via API.
*   **Platform**: It looks like it was generated using a low-code/no-code platform called "Miaoda."

The "six-dimensional vector" is actually **6 pairs of binary traits**. The matching algorithm is essentially **Classification**, not **Regression** or **Clustering**. It simplifies the rich personality spectrum into 64 discrete boxes.

## Conclusion

Although the algorithm logic is simpler and more straightforward than expected, it doesn't diminish its fun. Reducing complex personalities to a few labels is exactly the secret behind the popularity of various online personality tests—it's simple, easy to share, and provides a seemingly certain "identity."

Next time you find out you are Reimu Hakurei or Marisa Kirisame, think about it: Did you meet her in that 1/64 box, or were you "destined" by a random function to be by her side?

---
*This article is based on the analysis of public page source code and is for educational purposes only.*

Sincerely,

**Su Xinxian (he/him)**  
Undergraduate Student / Incoming Ph.D. Student (2026)  
Beijing Jiaotong University
