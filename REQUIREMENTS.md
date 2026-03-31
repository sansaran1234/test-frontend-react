# Frontend Developer Assessment: React Project

## 🛠 Tech Stack
- **React** (Vite + TypeScript แนะนำเป็นมาตรฐาน)
- **TanStack Router**: สำหรับจัดการ Routing ภายในแอปพลิเคชัน
- **TanStack Table**: สำหรับแสดงข้อมูลในรูปแบบตาราง
- **TanStack Query**: สำหรับจัดการ API Data Fetching, Caching และ State
- **Shadcn UI**: สำหรับใช้งาน UI Components
- *อนุญาตให้ใช้ Utility Library ทั่วไปที่จำเป็นได้ เช่น `axios`, `zod`, `clsx`, `tailwind-merge`, หรือ `react-hook-form`*

## 📚 API แบบจำลอง (Mock API)
ใช้บริการจาก REST API: [JSONPlaceholder](https://jsonplaceholder.typicode.com)

**Resource ที่แนะนำ:**
- `/posts`
- `/users`
- `/comments`

## 📋 ข้อกำหนดและฟีเจอร์ของระบบ (Requirements)

พัฒนาระบบ Web Application สำหรับจัดการข้อมูลบทความ (Posts) หรือข้อมูลอื่นๆ จาก API ข้างต้น โดยมีเงื่อนไขดังต่อไปนี้:

### 1. ฟังก์ชันการเชื่อมต่อ API (CRUD Operations)
ต้องรองรับการจัดการข้อมูลให้ครบถ้วน:
- ✅ **GET**: อ่านและแสดงข้อมูล (ทั้งแบบรายการและรายบุคคล)
- ✅ **POST**: สร้างข้อมูลใหม่
- ✅ **PATCH**: อัปเดต/แก้ไขข้อมูล
- ✅ **DELETE**: ลบข้อมูล

### 2. การจัดการ Routing (ด้วย TanStack Router)
ต้องมีการแบ่งหน้าแอปพลิเคชันอย่างน้อย 3 หน้า โดยมีโครงสร้าง Route แนะนำดังนี้:
- 📄 **หน้า List** (`/posts`): แสดงรายการข้อมูลทั้งหมด
- ➕ **หน้า Create** (`/posts/create`): สำหรับกรอกข้อมูลเพื่อสร้างรายการใหม่
- ✏️ **หน้า Detail หรือ Edit** (`/posts/$postId`): แสดงรายละเอียดของข้อมูล และทำหน้าที่เป็นหน้าแก้ไขข้อมูลไปในตัว

### 3. ตารางแสดงข้อมูล (ด้วย TanStack Table)
ในหน้า `List` จะต้องแสดงข้อมูลในรูปแบบตารางที่ต้องมีคุณสมบัติเพิ่มเติมดังนี้:
- 🔍 **Global Filter / Search**: สามารถพิมพ์ค้นหาข้อมูลรายการในตารางได้อย่างอิสระ
- 📑 **Pagination**: สามารถแบ่งหน้า (เปลี่ยนหน้า) การแสดงผลข้อมูลในตารางได้

### 4. การจัดการฟอร์มและการกรอกข้อมูล (Form Management)
ในหน้า `Create` และ `Edit` จะต้องมีฟอร์มสำหรับจัดการข้อมูลที่มีความสามารถดังนี้:
- **Form Validation**: มีการตรวจสอบความถูกต้องของข้อมูลเบื้องต้น
- **ปุ่ม Submit**: สำหรับกดยืนยันเพื่อบันทึกข้อมูล
- **ปุ่ม Reset หรือ Cancel**: สำหรับยกเลิกหรือล้างข้อมูลในฟอร์ม
- **Error Messages**: หากกรอกข้อมูลผิดพลาด ต้องมีข้อความแจ้งเตือนที่ชัดเจนและผู้ใช้ทั่วไปสามารถเข้าใจได้

---

**ข้อเสนอแนะสำหรับการเริ่มโปรเจกต์:**
สามารถติดตั้งไลบรารีที่โจทย์ต้องการเบื้องต้นได้โดยรันคำสั่ง:
```bash
npm install @tanstack/react-router @tanstack/react-table @tanstack/react-query axios zod react-hook-form @hookform/resolvers clsx tailwind-merge
```
*หลังจากนั้นให้ตั้งค่า Tailwind CSS และติดตั้ง `shadcn/ui` ตาม Documentation ต่อไป*
