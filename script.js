// script.js

document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // تجنب إرسال النموذج بطريقة التقليدية

    // جلب قيم الإدخال
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;

    // إنشاء اتصال بقاعدة البيانات SQLite
    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

    // إنشاء جدول إذا لم يكن موجودًا بالفعل
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS userData (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)');
    });

    // إدراج البيانات في قاعدة البيانات
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO userData (name, age) VALUES (?, ?)', [name, age]);
    });

    // إعادة تحميل الصفحة لتحديث العرض
    location.reload();
});
