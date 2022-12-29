package com.ssafy.instar.controller;

import com.ssafy.instar.entity.Content;
import com.ssafy.instar.repository.ContentRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/content")
public class Restcontroller {

    ContentRepository contentRepository;

    @GetMapping
    public List<Map<String, Object>> list() {
        List<Map<String, Object>> result = new ArrayList<>();
        List<Content> contentList = contentRepository.findAll();

        for (int i = 0; i < contentList.size(); i++) {
            HashMap<String, Object> hmap = new HashMap<>();
            hmap.put("uid", contentList.get(i).getUid());
            hmap.put("path", contentList.get(i).getPath());
            hmap.put("title", contentList.get(i).getTitle());
            result.add(hmap);
        }
        return result;
    }

    @PostMapping
    public Map<String, String> post(@RequestPart("picture") MultipartFile pic,
                                    @RequestParam("title") String title,
                                    @RequestParam("password") String password) throws IOException {
        String path = System.getProperty("user.dir");
        File file = new File(path + pic.getOriginalFilename());
        Content c1 = new Content();
        c1.setPath(pic.getOriginalFilename());
        c1.setTitle(title);
        c1.setPassword(password);
        pic.transferTo(file);
        this.contentRepository.save(c1);
        Map result = new HashMap<String, String>();
        result.put("path", pic.getOriginalFilename());
        return result;
    }

    @PutMapping("/{uid}")
    public Map<String, String> update(@PathVariable int uid, @RequestPart("picture") MultipartFile pic,
                                      @RequestParam("title") String title,
                                      @RequestParam("password") String password) throws IOException {
//        List<Content> contentList = contentRepository.findAll();
//        for (int i = 0;i< contentList.size();i++) {
//            if (contentList.get(i).getUid() == uid && contentList.get(i).getPassword() == password) {
//                if (!pic.isEmpty()) {
//                    String path = System.getProperty("user.dir");
//                    File file = new File(path + pic.getOriginalFilename());
//                    pic.transferTo(file);
//                    contentList.get(i).setPath(pic.getOriginalFilename());
//                }
//                contentList.get(i).setTitle(title);
//                this.contentRepository.save(contentList.get(i));
//                break;
//            }
//        }

        Content content = this.contentRepository.getReferenceById(uid);
        if (content.getPassword().equals(password)) {
            if (!pic.isEmpty()) {
                String path = System.getProperty("user.dir");
                File file = new File(path + pic.getOriginalFilename());
                pic.transferTo(file);
                content.setPath(pic.getOriginalFilename());
            }
            content.setTitle(title);
            content.setPassword(password);
            this.contentRepository.save(content);
        }
        Map result = new HashMap<String, String>();
        result.put("path", pic.getOriginalFilename());
        return result;
    }

    @DeleteMapping("/{uid}")
    public void delete(@PathVariable int uid, @RequestBody Map<String, Object> body) {
        if (body.get("password").equals(contentRepository.getReferenceById(uid).getPassword())) {
            contentRepository.deleteById(uid);
        }
    }
}