import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      root: {
        title: "Posts Manager",
        navPosts: "Posts",
        navUsers: "Users"
      },
      posts: {
        title: "Posts",
        subtitle: "Manage and browse all blog posts",
        createBtn: "Create Post",
        searchPlaceholder: "Search posts...",
        id: "ID",
        user: "User",
        postTitle: "Title",
        edit: "Edit",
        delete: "Delete",
        deleting: "Deleting...",
        noPosts: "No posts found.",
        pageInfo: "Page {{page}} of {{pageCount}} · {{count}} result{{suffix}}",
        previous: "Previous",
        next: "Next",
        deleteTitle: "Delete Post",
        deleteConfirm: "Are you sure you want to delete post #{{id}}? This action cannot be undone.",
        cancel: "Cancel",
        failLoad: "Failed to load posts.",
        checkConnection: "Please check your connection and try again.",
        deleteSuccess: "Post #{{id}} deleted successfully",
        deleteError: "Failed to delete post. Please try again."
      },
      users: {
        title: "Users",
        subtitle: "Manage and browse all users",
        createBtn: "Create User",
        searchPlaceholder: "Search users...",
        id: "ID",
        name: "Name",
        email: "Email",
        phone: "Phone",
        website: "Website",
        edit: "Edit",
        delete: "Delete",
        deleting: "Deleting...",
        noUsers: "No users found.",
        pageInfo: "Page {{page}} of {{pageCount}} · {{count}} result{{suffix}}",
        previous: "Previous",
        next: "Next",
        deleteTitle: "Delete User",
        deleteConfirm: "Are you sure you want to delete user #{{id}}? This action cannot be undone.",
        cancel: "Cancel",
        failLoad: "Failed to load users.",
        checkConnection: "Please check your connection and try again.",
        deleteSuccess: "User #{{id}} deleted successfully",
        deleteError: "Failed to delete user. Please try again.",
        createSuccess: "User created successfully (ID: {{id}})",
        createError: "Failed to create user. Please try again.",
        updateSuccess: "User updated successfully",
        updateError: "Failed to update user. Please try again.",
        backToUsers: "Back to Users",
        createTitle: "Create New User",
        createDesc: "Fill in the details below to create a new user.",
        editTitle: "Edit User",
        editDesc: "Update the user details below.",
        saveChanges: "Save Changes",
        notFound: "User not found.",
        notFoundDesc: "The user you're looking for doesn't exist or has been deleted."
      }
    }
  },
  th: {
    translation: {
      root: {
        title: "ระบบจัดการโพสต์",
        navPosts: "รายชื่อโพสต์",
        navUsers: "รายชื่อผู้ใช้"
      },
      posts: {
        title: "โพสต์",
        subtitle: "จัดการและเรียกดูโพสต์บล็อกทั้งหมด",
        createBtn: "สร้างโพสต์",
        searchPlaceholder: "ค้นหาโพสต์...",
        id: "รหัส",
        user: "ผู้ใช้",
        postTitle: "หัวข้อ",
        edit: "แก้ไข",
        delete: "ลบ",
        deleting: "กำลังลบ...",
        noPosts: "ไม่พบโพสต์",
        pageInfo: "หน้า {{page}} จาก {{pageCount}} · {{count}} รายการ",
        previous: "ก่อนหน้า",
        next: "ถัดไป",
        deleteTitle: "ลบโพสต์",
        deleteConfirm: "คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์ #{{id}}? การกระทำนี้ไม่สามารถยกเลิกได้เลย",
        cancel: "ยกเลิก",
        failLoad: "ไม่สามารถโหลดโพสต์ได้",
        checkConnection: "โปรดตรวจสอบการเชื่อมต่อของคุณแล้วลองอีกครั้ง",
        deleteSuccess: "ลบโพสต์ #{{id}} สำเร็จแล้ว",
        deleteError: "ไม่สามารถลบโพสต์ได้ โปรดลองอีกครั้ง"
      },
      users: {
        title: "ผู้ใช้",
        subtitle: "จัดการและเรียกดูผู้ใช้ทั้งหมด",
        createBtn: "สร้างผู้ใช้",
        searchPlaceholder: "ค้นหาผู้ใช้...",
        id: "รหัส",
        name: "ชื่อ",
        email: "อีเมล",
        phone: "โทรศัพท์",
        website: "เว็บไซต์",
        edit: "แก้ไข",
        delete: "ลบ",
        deleting: "กำลังลบ...",
        noUsers: "ไม่พบผู้ใช้",
        pageInfo: "หน้า {{page}} จาก {{pageCount}} · {{count}} รายการ",
        previous: "ก่อนหน้า",
        next: "ถัดไป",
        deleteTitle: "ลบผู้ใช้",
        deleteConfirm: "คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้ #{{id}}? การกระทำนี้ไม่สามารถยกเลิกได้เลย",
        cancel: "ยกเลิก",
        failLoad: "ไม่สามารถโหลดผู้ใช้ได้",
        checkConnection: "โปรดตรวจสอบการเชื่อมต่อของคุณแล้วลองอีกครั้ง",
        deleteSuccess: "ลบผู้ใช้ #{{id}} สำเร็จแล้ว",
        deleteError: "ไม่สามารถลบผู้ใช้ได้ โปรดลองอีกครั้ง",
        createSuccess: "สร้างผู้ใช้สำเร็จ (รหัส: {{id}})",
        createError: "ไม่สามารถสร้างผู้ใช้ได้ โปรดลองอีกครั้ง",
        updateSuccess: "อัปเดตผู้ใช้สำเร็จแล้ว",
        updateError: "ไม่สามารถอัปเดตผู้ใช้ได้ โปรดลองอีกครั้ง",
        backToUsers: "กลับไปหน้าผู้ใช้",
        createTitle: "สร้างผู้ใช้ใหม่",
        createDesc: "กรอกรายละเอียดด้านล่างเพื่อสร้างผู้ใช้ใหม่",
        editTitle: "แก้ไขผู้ใช้",
        editDesc: "อัปเดตรายละเอียดผู้ใช้ด้านล่าง",
        saveChanges: "บันทึกการเปลี่ยนแปลง",
        notFound: "ไม่พบผู้ใช้",
        notFoundDesc: "ผู้ใช้ที่คุณกำลังค้นหาไม่มีอยู่หรือถูกลบไปแล้ว"
      }
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'th', // default to Thai
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
