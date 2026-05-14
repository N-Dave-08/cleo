# 📘 Database Documentation

## 🧩 Overview

This database powers a social media feed application with the following features:

- User profiles
- Posts with text content
- Multiple images per post
- Likes system
- Comments system
- Bookmark system
- Row Level Security (RLS)

---

## 🧱 Tables

---

## 👤 profiles

Stores user profile information.

| Column     | Type        | Notes                  |
| ---------- | ----------- | ---------------------- |
| id         | uuid        | Primary key            |
| username   | text        | Unique username        |
| full_name  | text        | Optional full name     |
| avatar_url | text        | Optional avatar image  |
| bio        | text        | Optional bio           |
| updated_at | timestamptz | Auto updated timestamp |

---

## 📝 posts

Stores user posts.

| Column     | Type        | Notes                  |
| ---------- | ----------- | ---------------------- |
| id         | uuid        | Primary key            |
| user_id    | uuid        | References profiles.id |
| content    | text        | Post text              |
| created_at | timestamptz | Creation timestamp     |

---

## 🖼 post_images

Stores images attached to posts.

| Column     | Type        | Notes               |
| ---------- | ----------- | ------------------- |
| id         | uuid        | Primary key         |
| post_id    | uuid        | References posts.id |
| image_url  | text        | Image URL           |
| position   | integer     | Image order         |
| created_at | timestamptz | Upload timestamp    |

---

## ❤️ likes

Stores likes per post.

| Column     | Type        | Notes                  |
| ---------- | ----------- | ---------------------- |
| id         | bigint      | Primary key            |
| user_id    | uuid        | References profiles.id |
| post_id    | uuid        | References posts.id    |
| created_at | timestamptz | Timestamp              |

---

## 💬 comments

Stores comments on posts.

| Column     | Type        | Notes                  |
| ---------- | ----------- | ---------------------- |
| id         | uuid        | Primary key            |
| user_id    | uuid        | References profiles.id |
| post_id    | uuid        | References posts.id    |
| content    | text        | Comment text           |
| created_at | timestamptz | Timestamp              |

---

## 🔖 bookmarks

Stores saved posts.

| Column     | Type        | Notes                  |
| ---------- | ----------- | ---------------------- |
| id         | bigint      | Primary key            |
| user_id    | uuid        | References profiles.id |
| post_id    | uuid        | References posts.id    |
| created_at | timestamptz | Timestamp              |

---

## 🔗 Relationships

- profiles → posts (1 to many)
- posts → post_images (1 to many)
- posts → likes (1 to many)
- posts → comments (1 to many)
- posts → bookmarks (1 to many)

- profiles → likes/comments/bookmarks (1 to many)

---

## 🔐 Row Level Security (RLS)

### posts

- SELECT: public
- INSERT: authenticated users only (auth.uid() = user_id)
- UPDATE: owner only
- DELETE: owner only

---

### comments

- SELECT: public
- INSERT: authenticated users only
- UPDATE: owner only
- DELETE: owner only

---

### likes

- SELECT: public
- INSERT: authenticated users only
- DELETE: owner only

---

### bookmarks

- SELECT: owner only
- INSERT: owner only
- DELETE: owner only

---

### post_images

- SELECT: public
- INSERT: only post owner
- DELETE: only post owner

---

### profiles

- SELECT: public
- UPDATE: owner only

---

## ⚙️ Database Functions

- handle_new_user → creates profile on signup
- rls_auto_enable → ensures RLS is enabled

---

## 🚀 Indexes

- posts.created_at (DESC) → feed sorting
- post_images.post_id → fast image loading
- profiles.username → fast lookup

### Unique Constraints

- profiles.username
- likes (user_id, post_id)
- bookmarks (user_id, post_id)

---

## 📌 Summary

This schema supports a scalable social feed system with:

- Secure RLS-based authorization
- Normalized relational structure
- Multi-image post support
- Efficient interaction tracking (likes/comments/bookmarks)
