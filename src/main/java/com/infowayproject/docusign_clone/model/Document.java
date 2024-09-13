package com.infowayproject.docusign_clone.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CollectionId;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "document_id")
    private Long documentId;
    @Column(name= "document_name", nullable = false)
    private String documentName;
    @Column(name = "file_path", nullable = false)
    private String filePath;
    @Column(name = "file_type", nullable = false)
    private String fileType;
    @Column(name = "file_size")
    private Integer fileSize;
    @ManyToOne
    @JoinColumn(name ="uploaded_by", nullable = false)
    private User uploadedBy;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @Column(name = "updatedAt", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}
