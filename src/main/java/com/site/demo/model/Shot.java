package com.site.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Entity
@NoArgsConstructor @Getter @ToString
public class Shot implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) @Setter
    private @NotNull Double x;
    @Column(nullable = false) @Setter
    private @NotNull Double y;
    @Column(nullable = false) @Setter
    private @NotNull Double r;
    @Column(nullable = false)
    private boolean inArea;
    @Column(nullable = false)
    private String shotTime;

    public Shot(Shot shot) {
        this.x = shot.x;
        this.y = shot.y;
        this.r = shot.r;
    }

    @PrePersist
    protected void prePersist() {
        this.shotTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        this.inArea = checkHit();
    }

    private boolean checkHit() {
        System.out.println(x);
        System.out.println(y);
        System.out.println(r);
        boolean flag = false;
        if (x >= 0 && y >= 0) {
            flag = y <= -x + r;
        } else if (x >= 0 && y <= 0) {
            flag = x * x + y * y <= (r / 2) * (r / 2);
        } else if (x <= 0 && y >= 0) {
            flag = x >= -r / 2 && y < r;
        }
        System.out.println(flag);
        return flag;
    }
}
