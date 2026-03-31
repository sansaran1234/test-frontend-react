import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      root: {
        title: "Posts Manager",
        navPosts: "Posts"
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
      }
    }
  },
  th: {
    translation: {
      root: {
        title: "ระบบจัดการโพสต์",
        navPosts: "รายชื่อโพสต์"
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
