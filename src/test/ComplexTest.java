
import com.site.demo.ShotManager;
import org.junit.Before;
import org.junit.Test;

import static junit.framework.TestCase.assertNotNull;
import static junit.framework.TestCase.assertNull;


public class ComplexTest {
    public ComplexTest() {
    }

    private ShotManager sm;

    @Before
    public void setUp() {

        sm = new ShotManager();
        System.out.println("llll");
    }

    @Test
    public void testAboba() {
//        sm.shoot();
        System.out.println("hohohooh");
        assertNull(sm.toString());
    }

}
