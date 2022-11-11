const Signup = () => {
    const handleSubmit = (event:any) => {
        event.prebentDefault();
        console.log('登録');
    };
    return (
        <div>
        <h1>新規登録</h1>
            <form onSubmit={handleSubmit}>
    <div>
          <label>メールアド巣</label>
                <input name="mail" type="email" placeholder="メールアドレス" />
    </div>
    <div>
          <label>ユーザ名</label>
                <input name="user" type="text"  placeholder="登録するユーザ名" />
    </div>
    <div>
          <label>パスワード</label>
        　　　　　<input name="pass" type="password"  placeholder="パスワード" />
    </div>
    <div>
        　<label>再パスワード</label>
            　　　<input name="pass2" type="password"  placeholder="再度パスワードを入力"　/>
    </div>
    <div>
        <label>年齢</label>
                 <input name="age" type="number"  min="0" max="100" />
    </div>
    <div>
        <label>性別</label>
                    <input name="gender" type="radio" value="男"/>
                    <input type="radio" name="gender" value="女"/>
    </div>
    <div>
        <button>登録</button>
    </div>
</form>
        </div>
    );
};

export default  Signup