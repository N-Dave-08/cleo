# 🏗️ Cleo Database Documentation

This document outlines the schema design, security implementation, and automation logic for the Cleo social platform, built on PostgreSQL via Supabase.

---

## 1. System Overview
The Cleo database utilizes a **relational schema** where the `profiles` table acts as the central hub connecting authentication data to application-specific content.

## 2. Entity Relationship Summary
The database follows a "Star Schema" centered around users and their content.

* **Profiles ↔ Posts**: One-to-Many (One user can have many posts).
* **Posts ↔ Comments**: One-to-Many (One post can have many comments).
* **Users ↔ Posts (Likes/Bookmarks)**: Many-to-Many (Many users can interact with many posts).

## 3. Data Dictionary

### **Profiles Table**
*Extends `auth.users` with public-facing information.*

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, FK (auth.users) | Unique ID linked to Auth system. |
| `username` | `text` | Unique, Not Null | The user's handle. |
| `full_name` | `text` | - | Display name. |
| `avatar_url` | `text` | - | Link to profile image. |
| `bio` | `text` | - | User biography. |

### **Posts Table**
*Stores the main content created by users.*

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key | Unique post ID. |
| `user_id` | `uuid` | FK (profiles) | The author of the post. |
| `content` | `text` | Not Null | Text body of the post. |
| `media_url` | `text` | - | Optional image or video link. |

### **Interactions (Likes, Comments, Bookmarks)**

| Table | Key Features | Relationship |
| :--- | :--- | :--- |
| **Likes** | `unique(user_id, post_id)` | Tracks post popularity. |
| **Comments** | `id`, `content` | Stores threaded discussions. |
| **Bookmarks** | Private Select Policy | Saved posts for later viewing. |

## 4. Automation & Triggers
We implemented a **Database Trigger** to automate user onboarding.

* **Function**: `handle_new_user()`
* **Trigger**: `on_auth_user_created`
* **Logic**: When a user signs up via Supabase Auth, the system automatically extracts the `username` from `raw_user_meta_data` and inserts a new row into `public.profiles`.

## 5. Security & Access Control (RLS)
We use **Row Level Security (RLS)** to enforce data privacy at the database level.

### **Read Policies (Select)**
* **Public Access**: `profiles`, `posts`, `likes`, and `comments` are viewable by everyone.
* **Private Access**: `bookmarks` are restricted so users can only see their own saved collection.

### **Write Policies (Insert/Update/Delete)**
* **Ownership Check**: Users can only `insert`, `update`, or `delete` content where the `user_id` matches their own `auth.uid()`.
* **Interactivity**: Users can post comments or likes, but they cannot modify or delete content authored by others.

## 6. Maintenance Logic
* **Cascade Deletes**: All tables use `on delete cascade`. If a user deletes their account, all associated posts, likes, comments, and bookmarks are automatically purged.
