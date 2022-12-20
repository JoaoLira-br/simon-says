package project319;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.*;
import static org.junit.Assert.assertTrue;


import java.util.concurrent.TimeUnit;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class TypingTest {

	static WebDriver driver;
//QUESTION: should i add chrome driver in 319 repo, so that paths become accessible to everyone?

	//TODO: Change to your local selenium chrome driver`s path here
	static String pathChromeDriver="C:/Users/jlira/Documents/seleniumWebDriver/chromedriver.exe";
	//TODO:Change to your local path TypingGame.html
	static String pathTypingGame="C:/Users/jlira/Desktop/319-project/HTML/Typing/TypingGame.html";
	//TODO:Change to your local path TypingScore.html
	static String pathTypingScore="C:/Users/jlira/Desktop/319-project/HTML/Typing/TypingScore.html";
	String userInput="user-input";
	String phrase="phrase";
	String score="score";
	String scoreBody="score-body";
	String TypingGamePage;
	String TypingScorePage;
	String TypingScoreBody;





//After having tested-> need to close the browser
	@BeforeClass
	public static void openBrowser()
	{
		System.setProperty("webdriver.chrome.driver", pathChromeDriver);
		driver= new ChromeDriver() ;
	driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
	}

	@AfterClass
	public static void closeBrowser() {
		driver.quit();
	}
//
// Testing if score and phrase update when Typing is successful
@Test
public void TypingSuccessTest() throws InterruptedException{
	driver.get(pathTypingGame);
	driver.manage().window().maximize();

		//first press enter to start
		driver.findElement(By.id(userInput)).sendKeys(Keys.ENTER);
		Thread.sleep(1000);
		//save the outputs
		int counter=0;
		String phrase1;
		String phrase2;
		int score1;
		int score2;
		while(counter<50) {

		 phrase1=driver.findElement(By.id(phrase)).getText();//
		 score1=Integer.parseInt(driver.findElement(By.id(score)).getText().substring(6).trim());
		System.out.println("length of score1:"+ driver.findElement(By.id(score)).getText().length());
		//give phrase output as input
		driver.findElement(By.id(userInput)).sendKeys(phrase1);
		Thread.sleep(10);
		driver.findElement(By.id(userInput)).sendKeys(Keys.ENTER);
		Thread.sleep(10);
		//save the second outputs
			score2=Integer.parseInt(driver.findElement(By.id(score)).getText().substring(6).trim());
			System.out.println("length of score2:"+driver.findElement(By.id(score)).getText().length());
		    phrase2=driver.findElement(By.id(phrase)).getText();

			//Checking if score is updating
			assertNotNull(score1);
			assertNotNull(score2);
			System.out.println(score1);
			System.out.println(score2);
			assertTrue(score2==score1+10);
			//checking if phrase is updating
			assertNotNull(phrase1);
			assertNotNull(phrase2);
			assertTrue(phrase2!=phrase1);
			counter++;
		}

}

// testing if score went to 0 when Typing failed, and if page changes to Score pages
@Test
public void TypingFailedTest() throws InterruptedException{
	driver.get(pathTypingGame);
	driver.manage().window().maximize();
	TypingGamePage=driver.getPageSource();
	driver.findElement(By.id(userInput)).sendKeys(Keys.ENTER);
	Thread.sleep(1000);


	//testing wrong input
	driver.findElement(By.id(userInput)).sendKeys("9");
	//QUESTION: do i need to delay the game from immediately going to TypingScores page?
	Thread.sleep(10);
	driver.findElement(By.id(userInput)).sendKeys(Keys.ENTER);

	System.out.println(driver.findElement(By.id(score)).getText());
	String finalScore1=driver.findElement(By.id(score)).getText().substring(6).trim();
	System.out.println(finalScore1);
	assertTrue(finalScore1.equals("0"));
	Thread.sleep(2000);



	//substring is for removing the ":file///" at the beginnning of the url
	assertEquals(pathTypingScore,driver.getCurrentUrl().substring(8));


}



}
