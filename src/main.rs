use coinbase_pro_rs::{Private, Sync, SANDBOX_URL};
use std::env;

fn main() {
    let KEY: &str =  &env::var("COINBASE_KEY").unwrap();
    let SECRET: &str = &env::var("COINBASE_SECRET").unwrap();
    let PASSPHRASE: &str = &env::var("COINBASE_PASS").unwrap();

    let client: Private<Sync> = Private::new(SANDBOX_URL, KEY, SECRET, PASSPHRASE);
    let accounts = client.get_accounts().unwrap();

    let btc = accounts.iter().find(|x| x.currency == "BTC").unwrap();
    println!("{}.  balance: {:?}", btc.currency, btc.balance);
    println!("{}.available: {:?}", btc.currency, btc.available);
    println!("{}.     hold: {:?}", btc.currency, btc.hold);
}